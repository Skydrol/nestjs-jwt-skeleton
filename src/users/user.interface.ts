import { Document } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';

export interface User extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly roles: Array<Role>;   
}