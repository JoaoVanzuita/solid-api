import { generateTokenProvider } from '@app/providers/generate-token'
import { IUsersRepository } from '@app/repositories/users-repository'
import { ApiError } from '@middleware/errors/api-error'
import { compare } from 'bcrypt'

interface ILoginRequest {
  email: string
  password: string
}

export class LoginService {

  constructor(
    private readonly usersRepository: IUsersRepository
  ) { }

  async execute(data: ILoginRequest) {

    const user = await this.usersRepository.findByEmailWithPass(data.email)

    if (!user) {
      throw new ApiError('Invalid login credentials')
    }

    const isPassValid = await compare(data.password, user.password)

    if (!isPassValid) {
      throw new ApiError('Invalid login credentials')
    }

    const token = await generateTokenProvider.execute(user.id)

    return {
      token
    }
  }
}