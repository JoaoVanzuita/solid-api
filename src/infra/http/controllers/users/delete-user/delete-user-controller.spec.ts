import { app } from '@app/app'
import { DeleteUserService } from '@app/services/users/delete-user/delete-user-service'
import { ApiError } from '@middleware/errors/api-error'
import request from 'supertest'
import { v4 as uuid } from 'uuid'

const id = uuid()

describe('Delete User controller', () => {

  it('should be able to delete an user', async () => {

    jest.spyOn(DeleteUserService.prototype, 'execute').mockResolvedValueOnce(null)

    const res = await request(app).delete(`/users/${id}`).send()

    expect(res.status).toEqual(204)
  })

  it('should return a 400 response if provided id is invalid', async () => {

    const res = await request(app).delete('/users/fake-id').send()

    expect(res.status).toEqual(400)
    expect(res.body.message).toEqual('id must be a valid UUID')
  })

  it('should not be able to delete an user that not exists', async () => {

    jest.spyOn(DeleteUserService.prototype, 'execute').mockRejectedValueOnce(new ApiError('User not found', 404))

    const res = await request(app).delete(`/users/${id}`).send()

    expect(res.status).toEqual(404)
    expect(res.body.message).toEqual('User not found')
  })

})