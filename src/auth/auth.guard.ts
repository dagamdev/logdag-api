import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService, TokenExpiredError } from '@nestjs/jwt'
import { Request } from 'express'
import { JWT_SECRET } from 'src/utils/constants'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    console.log(request.headers)
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('Authorization token not found')
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET
      })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload
    } catch (error) {
      console.error(error)
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired')
      }

      throw new UnauthorizedException('Invalid token')
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    console.log({ type, token })
    return type === 'Bearer' ? token : undefined
  }
}
