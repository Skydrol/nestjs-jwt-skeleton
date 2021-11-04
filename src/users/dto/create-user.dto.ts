export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  password: string;
  readonly roles: Array<String>;  
}
