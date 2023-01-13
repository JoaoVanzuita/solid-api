import { Env } from '@environment/env'
import { sign } from 'jsonwebtoken'

export class GenerateTokenProvider {
  async execute(userId: string){

    const token = sign({}, Env.JWT_SECRET, {
      subject: userId,
      expiresIn: '24h'
    })

    return token
  }
}