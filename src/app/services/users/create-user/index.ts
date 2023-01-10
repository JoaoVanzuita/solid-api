import { usersRepository } from '@database/prisma/users'

import { CreateUserService } from './create-user-service'

export const createUserService = new CreateUserService(usersRepository)