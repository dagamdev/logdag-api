import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'
import { RegisterAuthDto } from './auth.dto'
import { JWT_SECRET } from 'src/utils/constants'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService
  ) {}

  async register(newUser: RegisterAuthDto) {
    const hashedPassword = await bcrypt.hash(newUser.password, 10)
    const user = await this.prisma.user.create({
      data: {
        ...newUser,
        password: hashedPassword
      }
    })

    return user
  }

  async login(user: Omit<User, 'password'>) {
    return {
      user,
      token: await this.jwt.signAsync({
        id: user.id,
        email: user.email
      })
    }
  }

  async validateUser(credentials: { email: string; password: string }) {
    const { password, ...user } = await this.prisma.user.findUnique({
      where: { email: credentials.email }
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }
    const isPasswordValid = await bcrypt.compare(credentials.password, password)

    if (isPasswordValid) return user

    return null
  }
}