import { app } from '@app/app'
import { FindUsersByNameService } from '@app/services/users/find-users-by-name/find-users-by-name-service'
import { ApiError } from '@middleware/errors/api-error'
import request from 'supertest'
import { v4 as uuid } from 'uuid'

const user = {
  id: uuid(),
  name: 'test',
  email: 'test@test.com',
  password: 'test@123'
}

describe('Find Users by Name controller', () => {

  it('should be able to return an array with 2 users', async () => {

    jest.spyOn(FindUsersByNameService.prototype, 'execute').mockResolvedValueOnce([user, user])

    const res = await request(app).get('/users/searchByName?name=test').send()

    console.log(res)

    expect(res.status).toEqual(200)
    expect(res.body.result).toHaveLength(2)
  })

  it('should return a 404 response if no users were found', async () => {

    jest.spyOn(FindUsersByNameService.prototype, 'execute').mockRejectedValueOnce(new ApiError('No users found', 404))

    const res = await request(app).get('/users/searchByName?name=test').send()

    expect(res.status).toEqual(404)
  })

})