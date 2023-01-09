import { usersRepository } from 'src/infra/database/prisma/users'

import { CreateUserService } from './create-user-service'

export const createUserService = new CreateUserService(usersRepository)