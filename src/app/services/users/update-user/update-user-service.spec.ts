import { User } from '@app/entities/user'
import { ApiError } from '@middleware/errors/api-error'
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'

import { UpdateUserService } from './update-user-service'

let service: UpdateUserService
let usersRepository: InMemoryUsersRepository

const user = new User({
  name: 'name',
  email: 'email@gmail.com',
  password: 'teste@12'
})

describe('Update user service', () => {

  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    service = new UpdateUserService(usersRepository)
  })

  beforeEach(() => {
    usersRepository.users = []
  })

  it('should be able to update an user', async () => {

    usersRepository.save(user)

    const userUpdate = new User({
      ...user,
      name: 'name edited'
    }, user.id)

    await service.execute(userUpdate)

    expect(usersRepository.findById(user.id)).resolves.toEqual({
      id: userUpdate.id,
      name: userUpdate.name,
      email: userUpdate.email
    })
  })

  it('should not be able to update an user that not exists', async () => {

    try {
      await service.execute(user)

    } catch (err) {

      expect(err).toBeInstanceOf(ApiError)
      expect((err as ApiError).statusCode).toEqual(404)
    }
  })

})