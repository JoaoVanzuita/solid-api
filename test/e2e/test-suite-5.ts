import { app } from '@app/app'
import request from 'supertest'

import { createdUserId } from './test-suite-3'
import { tokenTest } from './utils/token-test'

export const testSuite5 = () => describe('[e2e] Delete User', () => {
  it('should be able to delete the user', async () => {

    const res = await request(app)
      .delete(`/users/${createdUserId}`)
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(204)
  })

  it('should return a 401 response if request does not have authorization header', async () => {

    const res = await request(app)
      .delete(`/users/${createdUserId}`)
      .send()

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
  })

  it('should return a 401 response if token in authorization header is invalid', async () => {

    const res = await request(app)
      .delete(`/users/${createdUserId}`)
      .set({
        'authorization': `${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
  })

  it('should not be able to delete an user that does not exist', async () => {

    const res = await request(app)
      .delete(`/users/${createdUserId}`)
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message')
  })
})