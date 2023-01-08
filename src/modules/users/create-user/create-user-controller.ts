import { Request, Response } from 'express'

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
}