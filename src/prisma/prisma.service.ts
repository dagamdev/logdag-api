import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  async getUser(id: string) {
    return await this.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
  }
}
