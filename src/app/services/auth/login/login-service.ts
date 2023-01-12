import { IUsersRepository } from '@app/repositories/users-repository'
import { Env } from '@environment/env'
import { ApiError } from '@middleware/errors/api-error'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

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

    const token = sign({}, Env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '5m'
    })

    return {
      token
    }
  }
}