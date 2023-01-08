import { usersRepository } from '@prisma/users'

import { CreateUserController } from './create-user-controller'
import { CreateUserService } from './create-user-service'

const createUserService = new CreateUserService(usersRepository)

const createUserController = new CreateUserController(createUserService)

export { createUserController }