import { usersRepository } from '@prisma/users'

import { FindUsersByNameService } from './find-users-by-name-service'

export const findUsersByNameService = new FindUsersByNameService(usersRepository)