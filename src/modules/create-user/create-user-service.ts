import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/users-repository'
import { ICreateUserRequestDto } from './create-user-dto'

export class CreateUserService {

  constructor(private readonly usersRepository: IUsersRepository) { }

  async execute(data: ICreateUserRequestDto) {

    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = new User(data)

    await this.usersRepository.save(user)
  }
}