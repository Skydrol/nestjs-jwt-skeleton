import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { stringify } from 'querystring';
import { User } from 'src/users/user.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Post /login
  //@UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) { 
    //return request.body.user;   
    return this.authService.login(request.body.user);  
  }


  // GET /protected
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() request): string { // TODO: require a Bearer Token and validate token
    return request.user; 
  }

}