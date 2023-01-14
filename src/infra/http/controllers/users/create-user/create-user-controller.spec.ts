import { app } from '@app/app'
import { User } from '@app/entities/user'
import { CreateUserService } from '@app/services/users/create-user/create-user-service'
import { ApiError } from '@middleware/errors/api-error'
import request from 'supertest'

const userTest = new User({
  name: 'test',
  email: 'test@test.com',
  password: 'test@123'
})

describe('Create User controller', () => {

  it('should be able to create an user', async () => {

    jest.spyOn(CreateUserService.prototype, 'execute').mockResolvedValueOnce(null)

    const res = await request(app).post('/users').send(userTest)

    expect(res.status).toEqual(201)
  })

  it('should not be able to create an user with empty request body', async () => {

    const res = await request(app).post('/users').send()

    expect(res.status).toEqual(400)
    expect(res.body.message).toEqual('name is a required field, email is a required field, password is a required field')
  })

  it('should not be able to save an user that already exists', async () => {

    jest.spyOn(CreateUserService.prototype, 'execute').mockRejectedValueOnce(new ApiError('User already exists'))

    const res = await request(app).post('/users').send(userTest)

    expect(res.status).toEqual(400)
    expect(res.body.message).toEqual('User already exists')
  })
})