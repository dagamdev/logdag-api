import { Injectable } from '@nestjs/common'
import { CreateGroupDto, UpdateGroupDto } from './groups.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

const groupSelect: Prisma.GroupSelect = {
  id: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true
}

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateGroupDto & { userId: string }) {
    return this.prisma.group.create({ data, select: groupSelect })
  }

  findAll() {
    return this.prisma.group.findMany({ select: groupSelect })
  }

  findOne(id: string) {
    return this.prisma.group.findUniqueOrThrow({
      where: { id },
      select: groupSelect
    })
  }

  update(id: string, data: UpdateGroupDto) {
    return this.prisma.group.update({
      where: { id },
      data,
      select: groupSelect
    })
  }

  remove(id: string) {
    return this.prisma.group.delete({ where: { id }, select: groupSelect })
  }
}
