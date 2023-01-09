import { NextFunction, Request, Response } from 'express'

import { ApiError } from './api-error'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: Error, req: Request, res: Response, _: NextFunction) => {

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      'status': err.statusCode,
      'message': err.message
    })
  }

  return res.status(500).json({
    'status': 500,
    'message': `Internal server error - ${err.message}`
  })
}