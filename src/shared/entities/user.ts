import { ApiError } from '@middleware/errors/api-error'
import * as emailValidator from 'email-validator'
import { v4 as uuid } from 'uuid'

export class User {
  public readonly id: string

  public name: string
  public email: string
  public password: string

  constructor(props: Omit<User, 'id'>, id?: string) {

    User.validateProps(props)

    Object.assign(this, props)

    if (!id) {
      this.id = uuid()
    }
  }

  private static validateProps(props: Omit<User, 'id'>){

    if (!emailValidator.validate(props.email))
      throw new ApiError('Invalid email')

    if (props.name.length < 3 || props.name.length > 25)
      throw new ApiError('Name must be between 3 and 25 characters')

    if (props.password.length < 8 || props.password.length > 20)
      throw new ApiError('Passoword must be between 8 and 20 characters')

    if(!props.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/))
      throw new ApiError('Password is too weak')
  }
}