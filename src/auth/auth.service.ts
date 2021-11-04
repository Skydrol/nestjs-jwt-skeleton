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
    
    
    
    if(user) {

      const isMatch = await bcrypt.compare(password, user.password);

      if(isMatch){
        const userReturn = { 
          sub: user._id,        
          name: user.username
        }
        return userReturn;
      }
      
    }

    return null;

  }

  async login(user: User) {    
    
    const validatedUser = await this.validateUser(user.email, user.password);    
    
    if(validatedUser){
      return {
        status: 'Logged In!',      
        access_token: this.jwtService.sign(validatedUser),
        user: validatedUser,
      };
    }

    return {
      status: 'Not logged In!',
      error : 'Wrong Credentials!'
    };
    
  }
}
