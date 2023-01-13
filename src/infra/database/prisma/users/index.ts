import { prisma } from '../prisma'
import { UsersRepository } from './users-repository'

export const usersRepository = new UsersRepository(prisma)