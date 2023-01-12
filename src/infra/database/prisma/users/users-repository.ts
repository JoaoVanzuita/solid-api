import { User } from '@entities/user'
import { PrismaClient } from '@prisma/client'
import { IUsersRepository } from '@repositories/users-repository'

export class UsersRepository implements IUsersRepository {

  constructor(private readonly prisma: PrismaClient) { }

  async findByEmail(email: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return user
  }

  async findByName(name: string): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany({
      where: {
        name: {
          contains: name
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return users
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return user
  }

  async findByEmailWithPass(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id
      }
    })
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        ...user
      }
    })
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        ...user
      }
    })
  }
}