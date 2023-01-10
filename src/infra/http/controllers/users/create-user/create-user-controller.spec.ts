/**
 * @jest-environment ./test/environment/prisma-environment-jest
 */

import { app } from '@app/app'
import request from 'supertest'

const saveUser = {
  name: 'test-integration',
  email: 'teste-integration@test.com',
  password: 'integration@12'
}

describe('Create User controller', () => {

  it('should be able to create an user', async () => {

    const res = await request(app).post('/users').send(saveUser)

    expect(res.status).toEqual(201)
  })

  it('should not be able to save a user that already exists', async () => {

    const res = await request(app).post('/users').send(saveUser)

    expect(res.status).toEqual(400)
  })

})