import { ApiError } from '@middleware/errors/api-error'
import { IUsersRepository } from '@repositories/users-repository'

export class FindUsersByNameService {

  constructor(
    private readonly usersRepository: IUsersRepository
  ) { }

  async execute(name: string) {

    if (!name) {
      name = ''
    }

    const users = await this.usersRepository.findByName(name)

    if (!users.length) {
      throw new ApiError('No users found', 404)
    }

    return users
  }
}