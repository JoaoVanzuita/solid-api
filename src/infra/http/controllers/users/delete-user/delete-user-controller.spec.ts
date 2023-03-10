import { app } from '@app/app'
import { DeleteUserService } from '@app/services/users/delete-user/delete-user-service'
import { Env } from '@environment/env'
import { ApiError } from '@middleware/errors/api-error'
import { randomUUID } from 'crypto'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

const id = randomUUID()

const tokenTest = sign({}, Env.JWT_SECRET, {
  subject: id,
  expiresIn: '5m'
})

describe('Delete User controller', () => {

  it('should be able to delete an user', async () => {

    jest.spyOn(DeleteUserService.prototype, 'execute').mockResolvedValueOnce(null)

    const res = await request(app)
      .delete(`/users/${id}`)
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(204)
  })

  it('should return a 400 response if provided id is invalid', async () => {

    const res = await request(app)
      .delete('/users/fake-id')
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(400)
    expect(res.body.message).toEqual('id must be a valid UUID')
  })

  it('should return a 401 response if request does not have authorization header', async () => {

    const res = await request(app)
      .delete(`/users/${id}`)
      .send()

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
  })

  it('should return a 401 response if token in authorization header is invalid', async () => {

    const res = await request(app)
      .delete(`/users/${id}`)
      .set({
        'authorization': `${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
  })

  it('should not be able to delete an user that does not exist', async () => {

    jest.spyOn(DeleteUserService.prototype, 'execute').mockRejectedValueOnce(new ApiError('User not found', 404))

    const res = await request(app)
      .delete(`/users/${id}`)
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(404)
    expect(res.body.message).toEqual('User not found')
  })

})