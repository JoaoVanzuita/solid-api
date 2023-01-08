import { prisma } from '../prisma'
import { UsersRepository } from './users-repository'

const usersRepository = new UsersRepository(prisma)

export { usersRepository }