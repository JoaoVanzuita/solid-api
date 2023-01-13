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