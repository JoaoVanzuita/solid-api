import { IUsersRepository } from '@app/repositories/users-repository'
import { ApiError } from '@middleware/errors/api-error'

export class DeleteUserService {

  constructor(
    private readonly usersRepository: IUsersRepository
  ) { }

  async execute(id: string) {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new ApiError('User not found', 404)
    }

    await this.usersRepository.delete(id)
  }
}