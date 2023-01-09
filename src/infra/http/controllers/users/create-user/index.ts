import { createUserService } from '@services/users/create-user'

import { CreateUserController } from './create-user-controller'

export const createUserController = new CreateUserController(createUserService)