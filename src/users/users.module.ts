import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { JwtService } from '@nestjs/jwt'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  providers: [PrismaService, UsersService, AuthService, JwtService],
  controllers: [UsersController],
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 2
      }
    ])
  ]
})
export class UsersModule {}
