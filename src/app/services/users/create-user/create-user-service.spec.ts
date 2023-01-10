import { User } from '@entities/user'
import { ApiError } from '@middleware/errors/api-error'
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'

import { CreateUserService } from './create-user-service'

let usersRepository: InMemoryUsersRepository
let service: CreateUserService

const user = new User({
  name: 'name',
  email: 'email@gmail.com',
  password: 'teste@12'
})

describe('Create User service', () => {

  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    service = new CreateUserService(usersRepository)
  })

  beforeEach(() => {
    usersRepository.users = []
  })

  it('should be able to save an user', async () => {

    await service.execute(user)

    expect(usersRepository.users).toHaveLength(1)
  })

  it('should not be able to save a user that already exists', async () => {

    try {
      await service.execute(user)

      await service.execute(user)

    } catch (err) {

      expect(err).toBeInstanceOf(ApiError)
      expect((err as ApiError).statusCode).toEqual(400)
    }
  })
})