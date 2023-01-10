import { UpdateUserService } from '@app/services/users/update-user/update-user-service'
import { validation } from '@middleware/validation/validation-middleware'
import { Request, Response } from 'express'
import * as yup from 'yup'

export class UpdateUserController {
  constructor(
    private readonly service: UpdateUserService
  ) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params
    const { name, email, password } = req.body

    await this.service.execute({
      id, name, email, password
    })

    return res.status(204).send()
  }

  validateRequest = validation({
    params: yup.object().shape({
      id: yup.string().uuid().required()
    }),
    body: yup.object().shape({
      name: yup.string().min(3).max(25).required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).max(20).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, { message: 'password is too weak' }).required()
    })
  })
}