import { DeleteUserService } from '@app/services/users/delete-user/delete-user-service'
import { validation } from '@middleware/validation/validation-middleware'
import { Request, Response } from 'express'
import * as yup from 'yup'

export class DeleteUserController {

  constructor(
    private readonly service: DeleteUserService
  ) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params

    await this.service.execute(id)

    return res.status(204).send()
  }

  validateRequest = validation({
    params: yup.object().shape({
      id: yup.string().uuid().required()
    })
  })
}