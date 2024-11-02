import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { JWT_SECRET, TOKEN_EXPIRATION_TIME } from 'src/utils/constants'

console.log({ JWT_SECRET, TOKEN_EXPIRATION_TIME })

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: TOKEN_EXPIRATION_TIME }
    })
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
