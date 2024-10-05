import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [AuthModule, UsersModule, LogsModule]
})
export class AppModule {}
