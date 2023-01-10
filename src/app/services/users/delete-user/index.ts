import { usersRepository } from '@database/prisma/users'

import { DeleteUserService } from './delete-user-service'

export const deleteUserService = new DeleteUserService(usersRepository)