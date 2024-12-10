import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.body);  
  }
 
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() request): string { 
    return request.body.user; 
  }

}