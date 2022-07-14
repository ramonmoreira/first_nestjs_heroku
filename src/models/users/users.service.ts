import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';
import { User } from '../../types/user';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { Payload } from 'src/types/payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(registerDTO: RegisterDTO) {
    const { email } = registerDTO;
    const user = await this.userModel.findOne({ email })
    if(user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST)
    }
    const createdUser = new this.userModel(registerDTO)
    await createdUser.save()
    return this.sanitizeUser(createdUser)
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user)
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password']
    return sanitized
  }
}
