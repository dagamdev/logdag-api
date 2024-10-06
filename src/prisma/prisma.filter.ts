import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { handlePrismaError } from 'src/lib/prisma'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    console.log('Prisma:', exception)

    if (exception.code === 'P2002') {
      handlePrismaError(res, 'Duplicate entry: A record with this value already exists.', ConflictException)
    }

    if (exception.code === 'P2025') {
      handlePrismaError(res, 'The requested record was not found', NotFoundException)
    }

    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
