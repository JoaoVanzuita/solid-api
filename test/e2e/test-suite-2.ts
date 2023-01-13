import { app } from '@app/app'
import request from 'supertest'

import { userTest } from './utils/user-test'

export const testSuite2 = () => describe('[e2e] Login', () => {

  it('should be able to login', async () => {

    const res = await request(app).post('/auth/login').send({
      email: userTest.email,
      password: userTest.password
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')

  })

  it('should not be able to login with invalid credentials', async () => {

    const res = await request(app).post('/auth/login').send({
      email: 'fake-email@test.com',
      password: 'fake-pass@12'
    })

    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message')
  })

})