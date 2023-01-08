import { ApiError } from '@middleware/errors/api-error'

import { User } from './user'

describe('User', () => {
  
  it('should be able to create an user', () => {

    const user = new User({
      name: 'name',
      email: 'email@gmail.com',
      password: 'teste@12'
    })

    expect(user).toBeDefined()
  })

  it('should not be able to create an user with name with more than 25 caracteres', () => {

    const createUser = () => new User({
      name: 'a'.repeat(30),
      email: 'email@gmail.com',
      password: 'teste@12'
    })

    expect(createUser).toThrowError(ApiError)
  })

  it('should not be able to create an user with invalid email', () => {

    const createUser = () => new User({
      name: 'teste',
      email: 'email',
      password: 'teste@12'
    })

    expect(createUser).toThrowError(ApiError)
  })

  it('should not be able to create an user with a weak password', () => {

    const createUser = () => new User({
      name: 'teste',
      email: 'email@gmail.com',
      password: 'teste12'
    })

    expect(createUser).toThrowError(ApiError)
  })
})