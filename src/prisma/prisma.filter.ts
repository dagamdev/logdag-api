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
    const setError = handlePrismaError(res, exception)

    console.log('Prisma:', exception)

    if (exception.code === 'P2002') {
      setError('Duplicate entry: A record with this value already exists.', ConflictException)
    } else if (exception.code === 'P2003') {
      setError('The foreign key does not belong to any related element.', ConflictException)
    } else if (exception.code === 'P2025') {
      setError('The requested record was not found', NotFoundException)
    } else {
      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      })
    }
  }
}
