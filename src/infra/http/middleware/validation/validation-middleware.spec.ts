/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from '@middleware/errors/api-error'
import * as yup from 'yup'

import { validation } from './validation-middleware'

describe('validationMiddleware', () => {

  type TProperty = 'body' | 'params' | 'header' | 'query'

  type TAllSchemas = Record<TProperty, yup.SchemaOf<any>>

  let schemas: Partial<TAllSchemas>
  let req: any
  let res: any
  let next: any

  beforeEach(() => {
    schemas = {
      body: yup.object().shape({
        firstName: yup.string().required()
      })
    }
    req = {
      body: {
        firstName: 'test name'
      }
    }
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }
    next = jest.fn()
  })

  it('should validate the request body', () => {
    validation(schemas)(req, res, next)

    expect(next).toBeCalled()
  })

  it('should throw an ApiError when validation fails', async () => {
    req.body.firstName = undefined

    try {
      await validation(schemas)(req, res, next)

    } catch (err) {

      expect(err).toBeInstanceOf(ApiError)
      expect((err as ApiError).statusCode).toEqual(400)
    }
  })
})