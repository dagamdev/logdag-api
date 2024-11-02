import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { PrismaFilter } from './prisma/prisma.filter'

console.log(process.version)

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new PrismaFilter())
  app.setGlobalPrefix('api/v1')
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  await app.listen(process.env.PORT ?? 4000)
}

bootstrap()
