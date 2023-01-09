import { findUsersByNameService } from '@services/users/find-users-by-name'

import { FindUsersByNameController } from './find-users-by-name-controller'

export const findUsersByNameController = new FindUsersByNameController(findUsersByNameService)