import { app } from '@app/app'
import { UpdateUserService } from '@app/services/users/update-user/update-user-service'
import { ApiError } from '@middleware/errors/api-error'
import request from 'supertest'
import { v4 as uuid } from 'uuid'

const user = {
  name: 'test',
  email: 'test@test.com',
  password: 'test@123'
}

const id = uuid()

describe('Update User controller', () => {

  it('should be able to update an user', async () => {

    jest.spyOn(UpdateUserService.prototype, 'execute').mockResolvedValueOnce(null)

    const res = await request(app).put(`/users/${id}`).send(user)

    expect(res.status).toEqual(204)
  })

  it('should not be able to create an user with empty request body', async () => {

    const res = await request(app).put(`/users/${id}`).send()

    expect(res.status).toEqual(400)
    expect(res.body.message).toEqual('name is a required field, email is a required field, password is a required field')
  })

  it('should not be able to update an user that not exists', async () => {

    jest.spyOn(UpdateUserService.prototype, 'execute').mockRejectedValueOnce(new ApiError('User not found', 404))

    const res = await request(app).put(`/users/${id}`).send(user)

    expect(res.status).toEqual(404)
    expect(res.body.message).toEqual('User not found')
  })

})