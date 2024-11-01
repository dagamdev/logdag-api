import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginAuthDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string
}

export class RegisterAuthDto extends LoginAuthDto {
  @IsString()
  @MinLength(4)
  name: string
}
