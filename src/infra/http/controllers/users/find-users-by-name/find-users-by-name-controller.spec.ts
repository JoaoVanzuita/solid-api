import { app } from '@app/app'
import { User } from '@app/entities/user'
import { FindUsersByNameService } from '@app/services/users/find-users-by-name/find-users-by-name-service'
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

describe('Find Users by Name controller', () => {

  it('should be able to return an array with 2 users', async () => {

    jest.spyOn(FindUsersByNameService.prototype, 'execute').mockResolvedValueOnce([userTest, userTest])

    const res = await request(app)
      .get('/users/searchByName?name=test')
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(200)
    expect(res.body.result).toHaveLength(2)
  })

  it('should return a 401 response if request does not have authorization header', async () => {

    const res = await request(app)
      .get('/users/searchByName?name=not_found')
      .send()

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
  })

  it('should return a 401 response if token in authorization header is invalid', async () => {

    const res = await request(app)
      .get('/users/searchByName')
      .set({
        'authorization': `${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
  })

  it('should return a 404 response if no users were found', async () => {

    jest.spyOn(FindUsersByNameService.prototype, 'execute').mockRejectedValueOnce(new ApiError('No users found', 404))

    const res = await request(app)
      .get('/users/searchByName?name=test')
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(404)
    expect(res.body.message).toEqual('No users found')
  })

})