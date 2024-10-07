import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UnauthorizedException,
  ParseUUIDPipe
} from '@nestjs/common'
import { LogsService } from './logs.service'
import { CreateLogDto } from './dto/create-log.dto'
import { UpdateLogDto } from './dto/update-log.dto'
import { Request } from 'express'
import { AuthGuard } from 'src/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(@Req() req: Request, @Body() createLogDto: CreateLogDto) {
    const userId = req.user['id']

    if (!userId) throw new UnauthorizedException('User id not found')

    return this.logsService.create({ ...createLogDto, userId })
  }

  @Get()
  findAll(@Req() req: Request) {
    console.log(req.user)
    return this.logsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.logsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLogDto: UpdateLogDto
  ) {
    return this.logsService.update(id, updateLogDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.logsService.remove(id)
  }
}
