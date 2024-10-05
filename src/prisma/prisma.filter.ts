import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log('Prisma:', exception.code)

    // Prisma error code P2002: unique constraint violation
    if (exception.code === 'P2002') {
      console.log('Prisma error')
      // const exception = new ConflictException('Duplicate entry: A record with this value already exists.')
      // response.status(HttpStatus.EXPECTATION_FAILED).json({
        // statusCode: 400,
        // message: 'Duplicate entry: A record with this value already exists.',
        // error: 'Bad Request',
      // });
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: 'Duplicate entry: A record with this value already exists.',
        error: 'Bad Request',
      })
      // throw new ConflictException('Duplicate entry: A record with this value already exists.')
    } 
    // else {
    //   response.status(500).json({
    //     statusCode: 500,
    //     message: 'Internal server error',
    //   });
    // }
  }
}
