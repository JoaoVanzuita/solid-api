import { app } from '@app/app'
import request from 'supertest'
import { v4 as uuid } from 'uuid'

import { User } from './entities/user'

const user = new User({
  name: 'e2e test',
  email: 'e2e@test.com',
  password: '2e2@test'
})

let createdUserid: string

describe('[e2e] App test', () => {

  it('should be able to create an user', async () => {

    const res = await request(app).post('/users').send(user)

    expect(res.status).toEqual(201)
  })

  it('should not be able to create an user with empty request body', async () => {

    const res = await request(app).post('/users').send()

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
  })

  it('should return an array with the user created', async () => {

    const res = await request(app).get('/users/searchByName').send()

    createdUserid = res.body.result[0].id

    expect(res.status).toEqual(200)
    expect(res.body.result).toHaveLength(1)
  })

  it('should return a 404 response if no users were found', async () => {

    const res = await request(app).get('/users/searchByName?name=not_found').send()

    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message')
  })

  it('should be able to update the user', async () => {

    const res = await request(app).put(`/users/${createdUserid}`).send({
      ...user,
      name: 'e2e name edited'
    })

    expect(res.status).toEqual(204)
  })

  it('should not be able to update the user with empty request body', async () => {

    const res = await request(app).put(`/users/${createdUserid}`).send()

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
  })

  it('should not be able to update an user with that not exists', async () => {

    const res = await request(app).put(`/users/${uuid()}`).send(user)

    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message')
  })

  it('should be able to delete the user', async () => {

    const res = await request(app).delete(`/users/${createdUserid}`).send()

    expect(res.status).toEqual(204)
  })

  it('should not be able to delete an user that not exists', async () => {

    const res = await request(app).delete(`/users/${createdUserid}`).send()

    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message')
  })

})