import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.body.user);  
  }
 
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() request): string { 
    return request.body.user; 
  }

}