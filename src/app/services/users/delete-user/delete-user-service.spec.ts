import { User } from '@app/entities/user'
import { ApiError } from '@middleware/errors/api-error'
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'

import { DeleteUserService } from './delete-user-service'

let usersRepository: InMemoryUsersRepository
let service: DeleteUserService

const user = new User({
  name: 'name',
  email: 'email@gmail.com',
  password: 'teste@12'
})

describe('Delete User service', () => {

  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    service = new DeleteUserService(usersRepository)
  })

  beforeEach(() => {
    usersRepository.users = []
  })

  it('should be able to delete an user', async () => {

    usersRepository.save(user)

    await service.execute(user.id)

    expect(usersRepository.users).toHaveLength(0)
  })

  it('should not be able to delete an user that not exists', async () => {

    try {
      await service.execute(user.id)

    } catch (err) {

      expect(err).toBeInstanceOf(ApiError)
      expect((err as ApiError).statusCode).toEqual(404)
    }
  })

})