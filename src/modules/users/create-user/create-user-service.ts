import { User } from '@entities/user'
import { ApiError } from '@middleware/errors/api-error'

import { IUsersRepository } from '../repositories/users-repository'
import { ICreateUserRequestDto } from './create-user-dto'

export class CreateUserService {

  constructor(
    private readonly usersRepository: IUsersRepository,
  ) { }

  async execute(data: ICreateUserRequestDto) {

    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new ApiError('User already exists')
    }

    const user = new User(data)

    await this.usersRepository.save(user)
  }
}