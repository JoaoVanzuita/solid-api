import { NextFunction, Request, Response } from 'express'

import { ApiError } from './api-error'
import { errorMiddleware } from './error-middleware'

describe('errorMiddleware', () => {

  let err: Error
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    err = new Error('Error message')
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response
    next = jest.fn()
  })

  it('should return a 500 error when not an ApiError', () => {
    errorMiddleware(err, req, res, next)

    expect(res.status).toBeCalledWith(500)
    expect(res.json).toBeCalledWith({
      'status': 500,
      'message': `Internal server error - ${err.message}`
    })
  })

  it('should return a ApiError when an ApiError is passed', () => {
    const apiError = new ApiError('Bad request')

    errorMiddleware(apiError as unknown as Error, req, res, next)

    expect(res.status).toBeCalledWith(400)
    expect(res.json).toBeCalledWith({
      'status': 400,
      'message': apiError.message
    })
  })
})