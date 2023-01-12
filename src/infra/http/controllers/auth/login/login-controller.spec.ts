import { app } from '@app/app'
import { LoginService } from '@app/services/auth/login/login-service'
import { ApiError } from '@middleware/errors/api-error'
import request from 'supertest'

const loginData = {
  email: 'test@test.com',
  password: 'test@123'
}

describe('Login controller', () => {

  it('should be able to login', async () => {

    jest.spyOn(LoginService.prototype, 'execute').mockResolvedValueOnce({
      token: 'fake-jwt-token'
    })

    const res = await request(app).post('/auth/login').send(loginData)

    expect(res.status).toEqual(200)
    expect(res.body.token).toEqual('fake-jwt-token')
  })

  it('should not be able to login with empty request body', async () => {

    const res = await request(app).post('/auth/login').send()

    expect(res.status).toEqual(400)
    expect(res.body.message).toEqual('email is a required field, password is a required field')
  })

  it('should not be able to login with invalid creadentials', async () => {

    jest.spyOn(LoginService.prototype, 'execute').mockRejectedValueOnce(new ApiError('Invalid credentials'))

    const res = await request(app).post('/auth/login').send(loginData)

    expect(res.status).toEqual(400)
    expect(res.body.message).toEqual('Invalid credentials')
  })
})