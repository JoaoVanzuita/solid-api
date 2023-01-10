import { app } from '@app/app'
import { CreateUserService } from '@app/services/users/create-user/create-user-service'
import { ApiError } from '@middleware/errors/api-error'
import request from 'supertest'

const user = {
  name: 'test',
  email: 'test@test.com',
  password: 'test@123'
}

describe('Create User controller', () => {

  it('should be able to create an user', async () => {

    jest.spyOn(CreateUserService.prototype, 'execute').mockResolvedValueOnce(null)

    const res = await request(app).post('/users').send(user)

    expect(res.status).toEqual(201)
  })

  it('should not be able to create an user with empty request body', async () => {

    const res = await request(app).post('/users').send()

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
  })

  it('should not be able to save a user that already exists', async () => {

    jest.spyOn(CreateUserService.prototype, 'execute').mockRejectedValueOnce(new ApiError('User alredy exists'))

    const res = await request(app).post('/users').send(user)

    expect(res.status).toEqual(400)
  })

})