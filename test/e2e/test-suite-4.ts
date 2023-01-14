import { app } from '@app/app'
import { randomUUID } from 'crypto'
import request from 'supertest'

import { createdUserId } from './test-suite-3'
import { tokenTest } from './utils/token-test'
import { userTest } from './utils/user-test'

export const testSuite4 = () => describe('[e2e] Update User', () => {
  it('should be able to update the user', async () => {

    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send({
        ...userTest,
        name: 'e2e name edited'
      })

    expect(res.status).toEqual(204)
  })

  it('should return a 401 response if request does not have authorization header', async () => {

    const res = await request(app)
      .put(`/users/${randomUUID()}`)
      .send(userTest)

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
  })

  it('should return a 401 response if token in authorization header is invalid', async () => {

    const res = await request(app)
      .put(`/users/${randomUUID()}`)
      .set({
        'authorization': `${tokenTest}`
      })
      .send(userTest)

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
  })

  it('should not be able to update the user with empty request body', async () => {

    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
  })

  it('should not be able to update an user with that does not exist', async () => {

    const res = await request(app)
      .put(`/users/${randomUUID()}`)
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send(userTest)

    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message')
  })
})