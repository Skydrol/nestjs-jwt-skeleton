import { Injectable } from '@nestjs/common';
import { JwtService} from '@nestjs/jwt';
import { User } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor( 
    private usersService: UsersService,   
    private jwtService: JwtService
  ){}

  async validateUser(email: string, password: string): Promise<any> { 
    const user = await this.usersService.findOneByEmail(email); 
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if(user && isMatch) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;

  }

  async login(user: User) {
    const payload = { name: user.username, sub: user.id};
    
    const validatedUser = await this.validateUser(user.email, user.password);
    
    if(validatedUser != null){
      return {
        status: 'Logged!',      
        access_token: this.jwtService.sign(payload),
        //user: validatedUser,
      };
    }
    
  }
}
