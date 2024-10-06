import { ConflictException, NotFoundException } from "@nestjs/common"
import { Response } from "express"

type PrismaExceptions = typeof ConflictException | typeof NotFoundException

export function handlePrismaError (res: Response, message: string, PrismaException: PrismaExceptions) {
  const exceptionData = new PrismaException(message).getResponse()

  if (typeof exceptionData === 'string') {
    console.error('💎 exceptionData is string: ', exceptionData)
    return res.send(exceptionData)
  }

  if ('statusCode' in exceptionData) {
    return res.status(exceptionData.statusCode as number).json(exceptionData)
  }
  
  console.error('💎 statusCode not found: ', exceptionData)
  return res.json(exceptionData)
}
