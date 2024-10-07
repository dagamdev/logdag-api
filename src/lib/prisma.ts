import { ConflictException, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

type PrismaExceptions = typeof ConflictException | typeof NotFoundException

export function handlePrismaError(
  res: Response,
  exception: Prisma.PrismaClientKnownRequestError
) {
  return (message: string, PrismaException: PrismaExceptions) => {
    const exceptionData = new PrismaException(message).getResponse()

    if (typeof exceptionData === 'string') {
      console.error('💎 exceptionData is string: ', exceptionData)
      return res.send(exceptionData)
    }

    if ('statusCode' in exceptionData) {
      return res.status(exceptionData.statusCode as number).json({
        ...exceptionData,
        meta: exception.meta
      })
    }

    console.error('💎 statusCode not found: ', exceptionData)
    res.json(exceptionData)
  }
}
