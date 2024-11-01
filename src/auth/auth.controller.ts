import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotAcceptableException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto, RegisterAuthDto } from './auth.dto'
import { AuthGuard } from './auth.guard'
import { Request } from 'express'

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

  @UseGuards(AuthGuard)
  @Get('current')
  async current(@Req() { user }: Request) {
    if (!user) throw new UnauthorizedException('User not found')

    return this.auth.getCurrent(user.id)
  }
}
