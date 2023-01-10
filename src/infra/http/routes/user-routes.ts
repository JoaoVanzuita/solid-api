import { createUserController } from '@controllers/users/create-user'
import { findUsersByNameController } from '@controllers/users/find-users-by-name'
import { updateUserController } from '@controllers/users/update-user'
import { Router } from 'express'

const userRoutes = Router()

userRoutes.post('/', createUserController.validateRequest, (req, res) => {
  return createUserController.handle(req, res)
})

userRoutes.get('/searchByName', (req, res) => {
  return findUsersByNameController.handle(req, res)
})

userRoutes.put('/:id', updateUserController.validateRequest, (req, res) => {
  return updateUserController.handle(req, res)
})

export { userRoutes }