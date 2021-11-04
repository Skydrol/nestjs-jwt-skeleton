import { Role } from "src/auth/enums/role.enum";

export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  password: string;
  readonly roles: Array<Role>;  
}
