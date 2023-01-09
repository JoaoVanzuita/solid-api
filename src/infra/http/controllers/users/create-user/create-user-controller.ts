import { validation } from '@middleware/validation/validation-middleware'
import { CreateUserService } from '@services/users/create-user/create-user-service'
import { Request, Response } from 'express'
import * as yup from 'yup'

export class CreateUserController {

  constructor(
    private readonly service: CreateUserService
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    await this.service.execute({
      name, email, password
    })

    return res.status(201).send()
  }

  validateRequest = validation({
    body: yup.object().shape({
      name: yup.string().min(3).max(25).required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).max(20).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, { message: 'password is too weak' }).required()
    })
  })
}