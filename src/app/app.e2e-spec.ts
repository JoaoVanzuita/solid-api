import { app } from '@app/app'
import { Env } from '@environment/env'
import { randomUUID } from 'crypto'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

import { User } from './entities/user'

const user = new User({
  name: 'e2e test',
  email: 'e2e@test.com',
  password: '2e2@test'
})

let createdUserid: string

const token = sign({}, Env.JWT_SECRET, {
  subject: user.id,
  expiresIn: '5m'
})

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

    const res = await request(app)
      .get('/users/searchByName')
      .set({
        'authorization': `Bearer ${token}`
      })
      .send()

    createdUserid = res.body.result[0].id

    expect(res.status).toEqual(200)
    expect(res.body.result).toHaveLength(1)
    expect(res.body.result[0]).not.toHaveProperty('password')
  })

  it('should return a 404 response if no users were found', async () => {

    const res = await request(app)
      .get('/users/searchByName?name=not_found')
      .set({
        'authorization': `Bearer ${token}`
      })
      .send()

    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message')
  })

  it('should be able to update the user', async () => {

    const res = await request(app)
      .put(`/users/${createdUserid}`)
      .set({
        'authorization': `Bearer ${token}`
      })
      .send({
        ...user,
        name: 'e2e name edited'
      })

    expect(res.status).toEqual(204)
  })

  it('should not be able to update the user with empty request body', async () => {

    const res = await request(app)
      .put(`/users/${createdUserid}`)
      .set({
        'authorization': `Bearer ${token}`
      })
      .send()

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
  })

  it('should not be able to update an user with that not exists', async () => {

    const res = await request(app)
      .put(`/users/${randomUUID()}`)
      .set({
        'authorization': `Bearer ${token}`
      })
      .send(user)

    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message')
  })

  it('should be able to delete the user', async () => {

    const res = await request(app)
      .delete(`/users/${createdUserid}`)
      .set({
        'authorization': `Bearer ${token}`
      })
      .send()

    expect(res.status).toEqual(204)
  })

  it('should not be able to delete an user that not exists', async () => {

    const res = await request(app)
      .delete(`/users/${createdUserid}`)
      .set({
        'authorization': `Bearer ${token}`
      })
      .send()

    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message')
  })

})