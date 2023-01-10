import { usersRepository } from '@database/prisma/users/'

import { UpdateUserService } from './update-user-service'

export const updateUserService = new UpdateUserService(usersRepository)