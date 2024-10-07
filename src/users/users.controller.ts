import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './user.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler'

@UseGuards(AuthGuard, ThrottlerGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @SkipThrottle({ lithe: true })
  getAll() {
    return this.usersService.getAll()
  }

  @Get(':id')
  @SkipThrottle({ medium: true })
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUser)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id)
  }
}
