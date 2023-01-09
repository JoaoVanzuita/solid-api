import { createUserController } from '@modules/users/create-user'
import { Router } from 'express'

const userRoutes = Router()

userRoutes.post('/', createUserController.validateRequest, createUserController.handle)

export { userRoutes }