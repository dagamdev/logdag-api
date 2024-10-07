import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
  UseGuards
} from '@nestjs/common'
import { GroupsService } from './groups.service'
import { CreateGroupDto, UpdateGroupDto } from './groups.dto'
import { Request } from 'express'
import { AuthGuard } from 'src/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Req() req: Request, @Body() createGroupDto: CreateGroupDto) {
    const userId = req.user['id']
    return this.groupsService.create({ ...createGroupDto, userId })
  }

  @Get()
  findAll() {
    return this.groupsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.groupsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGroupDto: UpdateGroupDto
  ) {
    return this.groupsService.update(id, updateGroupDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.groupsService.remove(id)
  }
}
