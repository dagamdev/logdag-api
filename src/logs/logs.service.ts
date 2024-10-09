import { Injectable } from '@nestjs/common'
import { CreateLogDto } from './dto/create-log.dto'
import { UpdateLogDto } from './dto/update-log.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

const selectedFields: Prisma.LogSelect = {
  id: true,
  group: true,
  name: true,
  content: true,
  eventDate: true,
  createdAt: true,
  updatedAt: true
}

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateLogDto & { userId: string }) {
    return this.prisma.log.create({ data, select: selectedFields })
  }

  findAll() {
    return this.prisma.log.findMany({ select: selectedFields })
  }

  findOne(id: string) {
    return this.prisma.log.findUniqueOrThrow({
      where: { id },
      select: selectedFields
    })
  }

  update(id: string, data: UpdateLogDto) {
    return this.prisma.log.update({
      where: { id },
      data,
      select: selectedFields
    })
  }

  remove(id: string) {
    return this.prisma.log.delete({ where: { id }, select: selectedFields })
  }
}
