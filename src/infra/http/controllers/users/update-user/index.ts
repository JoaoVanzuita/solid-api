import { updateUserService } from '@app/services/users/update-user'

import { UpdateUserController } from './update-user-controller'

export const updateUserController = new UpdateUserController(updateUserService)