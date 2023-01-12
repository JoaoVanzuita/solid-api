import { loginService } from '@app/services/auth/login'

import { LoginController } from './login-controller'

export const loginController = new LoginController(loginService)