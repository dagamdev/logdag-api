import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotAcceptableException,
  Post
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto, RegisterAuthDto } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() registerData: RegisterAuthDto) {
    return this.auth.register(registerData)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() credentials: LoginAuthDto) {
    const user = await this.auth.validateUser(credentials)

    if (user) return this.auth.login(user)

    throw new NotAcceptableException('Invalid credentials')
  }
}
