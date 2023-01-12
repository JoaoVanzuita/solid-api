import { loginController } from '@controllers/auth/login'
import { Router } from 'express'

const authRoutes = Router()

authRoutes.post('/login', loginController.validateRequest, (req, res) => {
  return loginController.handle(req, res)
})

export { authRoutes }