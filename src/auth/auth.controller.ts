import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RegisterDTO } from 'src/models/users/dto/register.dto';
import { UsersService } from 'src/models/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        
      ) {}


      @Get("/onlyauth")
      @UseGuards(AuthGuard("jwt"))
  async hiddenInformation(){
    return  "hidden information";
  }
  @Get("/anyone")
async publicInformation(){
return  "this can be seen by anyone";
}

    @Post('register')
    async register(@Body() registerDTO: RegisterDTO) {
      const user = await this.usersService.create(registerDTO);
      const payload = {
      
        email: user.email,
      };
  
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }
    @Post('login')
    async login(@Body() loginDTO: LoginDTO) {
      const user = await this.usersService.findByLogin(loginDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
    }


    
}