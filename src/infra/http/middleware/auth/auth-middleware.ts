import { Env } from '@environment/env'
import { ApiError } from '@middleware/errors/api-error'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const bearerHeader = req.headers.authorization

  if (!bearerHeader) {
    throw new ApiError('Missing authorization header', 401)
  }

  const [bearer, token] = bearerHeader.split(' ')

  if (bearer !== 'Bearer') {
    throw new ApiError('Invalid authorization header', 401)
  }

  try {
    verify(token, Env.JWT_SECRET)

    return next()

  } catch (err) {

    throw new ApiError('Invalid token', 401)
    
  }
}