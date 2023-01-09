import { validation } from '@middleware/validation/validation-middleware'
import { FindUsersByNameService } from '@services/users/find-users-by-name/find-users-by-name-service'
import { Request, Response } from 'express'
import * as yup from 'yup'

export class FindUsersByNameController {
  constructor(
    private readonly service: FindUsersByNameService
  ) { }

  async handle(req: Request, res: Response) {
    const { name } = req.query

    const result = await this.service.execute(name as string)

    return res.json({
      result
    })
  }

  validateRequest = validation({
    query: yup.object().shape({
      name: yup.string().notRequired()
    })
  })
}