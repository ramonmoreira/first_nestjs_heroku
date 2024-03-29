import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async signPayload(payload: Payload) {
        return sign(payload, (process.env.SECRET_KEY || environment.SECRET_KEY), {expiresIn: '7d'})
    }

    async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload);
      }

}

