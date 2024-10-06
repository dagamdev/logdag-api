import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { RegisterAuthDto } from 'src/auth/auth.dto'
import { UpdateUserDto } from './user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.user.findMany()
  }

  async getOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })

    if (!user) {
      throw new NotFoundException(`No user found with id ${id}`)
    }

    return user
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const userUpdated = await this.prisma.user.update({ where: { id }, data })

      if (!userUpdated) {
        throw new NotFoundException(`No user found with id ${id}`)
      }

      return userUpdated
    } catch (error) {
      console.error(error)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('The email field must be unique')
      }
    }
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}
