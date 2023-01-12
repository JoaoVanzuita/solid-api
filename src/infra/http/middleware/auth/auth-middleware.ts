import { Env } from '@environment/env'
import { ApiError } from '@middleware/errors/api-error'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const authToken = req.headers.authorization

  if (!authToken) {
    throw new ApiError('Access token is missing', 401)
  }

  const [, token] = authToken.split(' ')

  try {
    verify(token, Env.JWT_SECRET)

    return next()

  } catch (err) {
    throw new ApiError('Invalid token', 401)
  }
}