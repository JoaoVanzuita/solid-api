import { usersRepository } from '@database/prisma/users'

import { LoginService } from './login-service'

export const loginService = new LoginService(usersRepository)