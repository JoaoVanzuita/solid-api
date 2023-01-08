import { User } from '@entities/user'
import { ApiError } from '@middleware/errors/api-error'
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'

import { CreateUserService } from './create-user-service'

const usersRepository = new InMemoryUsersRepository()
const createUserService = new CreateUserService(usersRepository)

describe('Create User service', () => {

  const saveUser = new User({
    name: 'name',
    email: 'email@gmail.com',
    password: 'teste@12'
  })

  it('should be able to save a user', async () => {

    await createUserService.execute(saveUser)

    expect(usersRepository.users[0]).toBeTruthy()
  })

  it('should not be able to save a user that already exists', async () => {

    try {
      await createUserService.execute({ ...saveUser })

    } catch (err) {

      expect(err).toBeInstanceOf(ApiError)
    }
  })
})