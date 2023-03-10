import { app } from '@app/app'
import { User } from '@app/entities/user'
import { UpdateUserService } from '@app/services/users/update-user/update-user-service'
import { Env } from '@environment/env'
import { ApiError } from '@middleware/errors/api-error'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

const userTest = new User({
  name: 'test',
  email: 'test@test.com',
  password: 'test@123'
})

const tokenTest = sign({}, Env.JWT_SECRET, {
  subject: userTest.id,
  expiresIn: '5m'
})

describe('Update User controller', () => {

  it('should be able to update an user', async () => {

    jest.spyOn(UpdateUserService.prototype, 'execute').mockResolvedValueOnce(null)

    const res = await request(app)
      .put(`/users/${userTest.id}`)
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send(userTest)

    expect(res.status).toEqual(204)
  })

  it('should return a 401 response if request does not have authorization header', async () => {

    const res = await request(app)
      .put(`/users/${userTest.id}`)
      .send(userTest)

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
  })

  it('should return a 401 response if token in authorization header is invalid', async () => {

    const res = await request(app)
      .put(`/users/${userTest.id}`)
      .set({
        'authorization': `${tokenTest}`
      })
      .send(userTest)

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
  })

  it('should return a 400 response if provided id is invalid', async () => {

    const res = await request(app)
      .put('/users/fake-id')
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send(userTest)

    expect(res.status).toEqual(400)
    expect(res.body.message).toEqual('id must be a valid UUID')
  })

  it('should not be able to create an user with empty request body', async () => {

    const res = await request(app)
      .put(`/users/${userTest.id}`)
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(400)
    expect(res.body.message).toEqual('name is a required field, email is a required field, password is a required field')
  })

  it('should not be able to update an user that does not exist', async () => {

    jest.spyOn(UpdateUserService.prototype, 'execute').mockRejectedValueOnce(new ApiError('User not found', 404))

    const res = await request(app)
      .put(`/users/${userTest.id}`)
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send(userTest)

    expect(res.status).toEqual(404)
    expect(res.body.message).toEqual('User not found')
  })

})