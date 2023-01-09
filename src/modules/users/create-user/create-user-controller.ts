import { validation } from '@middleware/validation/validation-middleware'
import { Request, Response } from 'express'
import * as yup from 'yup'

import { CreateUserService } from './create-user-service'

export class CreateUserController {

  constructor(private readonly createUserService: CreateUserService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    return res.status(201).send()

    await this.createUserService.execute({
      name, email, password
    })
  }

  validateRequest = validation({
    body: yup.object().shape({
      name: yup.string().min(3).max(25).required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).max(20).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, { message: 'password is too weak' }).required()
    })
  })
}