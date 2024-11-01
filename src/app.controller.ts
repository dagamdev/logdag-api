import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  async root() {
    return {
      message: 'Hello world'
    }
  }
}
