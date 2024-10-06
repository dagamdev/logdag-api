import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { JWT_SECRET } from 'src/utils/constants'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30m' }
    })
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
