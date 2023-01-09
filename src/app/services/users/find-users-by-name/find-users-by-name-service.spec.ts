import { User } from '@entities/user'
import { ApiError } from '@middleware/errors/api-error'
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'

import { FindUsersByNameService } from './find-users-by-name-service'

const usersRepository = new InMemoryUsersRepository()
const service = new FindUsersByNameService(usersRepository)

describe('Find users by name', () => {

  const saveUser = new User({
    name: 'name',
    email: 'email@gmail.com',
    password: 'teste@12'
  })

  beforeEach(() => {
    usersRepository.users = []
  })

  it('should be able to return an array with 3 users', async () => {

    usersRepository.save(saveUser)
    usersRepository.save(saveUser)
    usersRepository.save(saveUser)

    const result = await service.execute('')

    expect(result).toHaveLength(3)
  })

  it('should be able to return an array with 2 users', async () => {

    usersRepository.save(saveUser)
    usersRepository.save({
      ...saveUser,
      name: 'new name'
    })
    usersRepository.save({
      ...saveUser,
      name: 'edited'
    })

    const result = await service.execute('name')

    expect(result).toHaveLength(2)
  })

  it('should throw an error if no users were found', async () => {

    try {

      await service.execute('')

    } catch (err) {

      expect(err).toBeInstanceOf(ApiError)
      expect((err as ApiError).statusCode).toEqual(404)
    }
  })
})