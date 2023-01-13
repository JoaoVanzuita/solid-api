import { Env } from '@environment/env'
import { sign } from 'jsonwebtoken'

import { userTest } from './user-test'

export const tokenTest = sign({}, Env.JWT_SECRET, {
  subject: userTest.id,
  expiresIn: '2m'
})