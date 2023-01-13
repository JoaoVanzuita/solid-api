import { app } from '@app/app'
import request from 'supertest'

import { tokenTest } from './utils/token-test'

let createdUserId: string

export const testSuite3 = () => describe('[e2e] Find Users by Name', () => {

  it('should return an array with the user created', async () => {

    const res = await request(app)
      .get('/users/searchByName')
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send()

    createdUserId = res.body.result[0].id

    expect(res.status).toEqual(200)
    expect(res.body.result).toHaveLength(1)
    expect(res.body.result[0]).not.toHaveProperty('password')
  })

  it('should return a 404 response if no users were found', async () => {

    const res = await request(app)
      .get('/users/searchByName?name=not_found')
      .set({
        'authorization': `Bearer ${tokenTest}`
      })
      .send()

    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message')
  })

})
export { createdUserId }