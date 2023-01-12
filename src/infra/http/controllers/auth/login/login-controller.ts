import { LoginService } from '@app/services/auth/login/login-service'
import { validation } from '@middleware/validation/validation-middleware'
import { Request, Response } from 'express'
import * as yup from 'yup'

export class LoginController {

  constructor(
    private readonly service: LoginService
  ) { }

  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const { token } = await this.service.execute({
      email, password
    })

    return res.status(200).json({
      token
    })
  }

  validateRequest = validation({
    body: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(8).max(20).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, { message: 'password is too weak' }).required()
    })
  })
}