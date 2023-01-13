import { app } from '@app/app'
import request from 'supertest'

import { userTest } from './utils/user-test'

export const testSuite1 = () => describe('[e2e] Create User', () => {

  it('should be able to create an user', async () => {

    const res = await request(app).post('/users').send(userTest)

    expect(res.status).toEqual(201)
  })

  it('should not be able to create an user with empty request body', async () => {

    const res = await request(app).post('/users').send()

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
  })

})