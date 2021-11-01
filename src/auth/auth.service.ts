import { Injectable } from '@nestjs/common';
import { JwtService} from '@nestjs/jwt';
import { User } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor( 
    private usersService: UsersService,   
    private jwtService: JwtService
  ){}

  async validateUser(username: string, password: string): Promise<any> { 
    const user = await this.usersService.findOneByUsername(username);  
    
    if(user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;

  }

  async login(user: User) {
    const payload = { name: user.username, sub: user.id};
    return {
      status: 'Logged!',      
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
