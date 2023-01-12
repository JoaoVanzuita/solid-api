import { User } from '@app/entities/user'
import { ApiError } from '@middleware/errors/api-error'
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { hash } from 'bcrypt'

import { LoginService } from './login-service'

let usersRepository: InMemoryUsersRepository
let service: LoginService

const user = new User({
  name: 'name',
  email: 'email@gmail.com',
  password: 'teste@12'
})

describe('Login service', () => {

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    service = new LoginService(usersRepository)

    user.password = await hash(user.password, 10)
    usersRepository.users = [user]
  })

  it('should be able to login', async () => {

    const email = user.email
    const password = user.password

    user.password = await hash(user.password, 10)
    usersRepository.save(user)

    const result = await service.execute({
      email, password
    })

    expect(result.token).toBeDefined()
  })

  it('should not be able to login with invalid credentials', async () => {

    const email = 'fake-email'
    const password = 'fake-pass'

    try {

      await service.execute({
        email, password
      })

    } catch (err) {

      expect(err).toBeInstanceOf(ApiError)
      expect((err as ApiError).statusCode).toEqual(400)
    }
  })

})