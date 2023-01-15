import { Env } from '@environment/env'
import { randomUUID } from 'crypto'
import { NextFunction, Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

import { authMiddleware } from './auth-middleware'

describe('authMiddleware', () => {

  const tokenTest = sign({}, Env.JWT_SECRET, {
    subject: randomUUID(),
    expiresIn: '2m'
  })

  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  const nextFunction: NextFunction = jest.fn()

  beforeEach(() => {
    mockReq = {}
    mockRes = {
      json: jest.fn()
    }
  })

  it('should throw an ApiError if the authorization header is missing', () => {
    mockReq = { headers: {} }
    mockRes = {}

    expect(() => authMiddleware(mockReq as Request, mockRes as Response, nextFunction)).toThrowError('Missing authorization header')
  })

  it('should throw an ApiError if the bearer is not Bearer', () => {
    mockReq = { headers: { authorization: 'fake-bearer-token' } }
    mockRes = {}

    expect(() => authMiddleware(mockReq as Request, mockRes as Response, nextFunction)).toThrowError('Invalid authorization header')
  })

  it('should throw an ApiError if the token is invalid', () => {
    mockReq = { headers: { authorization: 'Bearer invalid' } }
    mockRes = {}

    expect(() => authMiddleware(mockReq as Request, mockRes as Response, nextFunction)).toThrowError('Invalid token')
  })

  it('should call the next callback if the token is valid', () => {
    mockReq = { headers: { authorization: `Bearer ${tokenTest}` } }
    mockRes = {}

    authMiddleware(mockReq as Request, mockRes as Response, nextFunction)

    expect(nextFunction).toBeCalled()
  })
})