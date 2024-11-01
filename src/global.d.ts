import { Request } from 'express'

declare global {
  interface AuthRequest extends Request {
    user: {
      id: string
    }
  }

  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
      }
    }
  }
}
