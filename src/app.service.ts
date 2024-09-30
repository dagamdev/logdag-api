import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    const names = [213, 23]
    return 'Hello World!'
  }
}
