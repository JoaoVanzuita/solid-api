import { deleteUserService } from '@app/services/users/delete-user'

import { DeleteUserController } from './delete-user-controller'

export const deleteUserController = new DeleteUserController(deleteUserService)