import { createUserController } from '@controllers/users/create-user'
import { findUsersByNameController } from '@controllers/users/find-users-by-name'
import { Router } from 'express'

const userRoutes = Router()

userRoutes.post('/', createUserController.validateRequest, (req, res) => {
  return createUserController.handle(req, res)
})

userRoutes.get('/searchByName', (req, res) => {
  return findUsersByNameController.handle(req, res)
})

export { userRoutes }