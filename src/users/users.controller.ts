import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from '@node-rs/bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/enums/role.enum';

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
  
  @UseGuards(RolesGuard)
  @hasRoles(Role.Admin)
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    
    const user = await this.usersService.findOne(id);
    
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles
    };

    return userData;
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
