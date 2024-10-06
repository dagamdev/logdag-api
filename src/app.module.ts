import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { LogsModule } from './logs/logs.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, LogsModule, ThrottlerModule.forRoot([
    {
      ttl: 1000,
      limit: 1
    }
  ])]
})
export class AppModule {}
