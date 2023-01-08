import { User } from '@entities/user'
import { PrismaClient } from '@prisma/client'
import { IUsersRepository } from 'src/modules/users/repositories/users-repository'

export class UsersRepository implements IUsersRepository {

  constructor(private readonly prisma: PrismaClient) { }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    return user
  }

  async findByName(name: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        name: {
          contains: name
        }
      }
    })

    return users
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        ...user
      }
    })
  }
}