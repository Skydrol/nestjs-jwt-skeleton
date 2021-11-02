import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {    
    const saltOrRounds = 10;   
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    return this.usersService.create(createUserDto);
  } 
  
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }  

  @Get('profile')
  async getUserProfile(@Request() request: any) {
    return request.user;
  }
}
