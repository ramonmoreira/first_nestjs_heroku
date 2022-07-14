import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() RegisterDto: RegisterDTO){
    const user = await this.usersService.create(RegisterDto)
    const payload = {
      email: user.email
    }
    const token = await this.authService.signPayload(payload)
    return { user, token }
  }

  @Post('login')
  async login(@Body() UserDto: LoginDTO) {
    const user = await this.usersService.findByLogin(UserDto)
    const payload = {
      email: user.email
    }
    const token = await this.authService.signPayload(payload);
    return { user, token }
  }

}
