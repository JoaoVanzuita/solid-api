import { User } from '@app/entities/user'
import { IUsersRepository } from '@app/repositories/users-repository'
import { ApiError } from '@middleware/errors/api-error'

export class UpdateUserService {
  constructor(
    private readonly usersRepository: IUsersRepository
  ) { }

  async execute(data: User) {
    const userExists = await this.usersRepository.findById(data.id)

    if(!userExists) {
      throw new ApiError('User not found', 404)
    }

    const user = new User(data, data.id)

    await this.usersRepository.update(user)
  }

}