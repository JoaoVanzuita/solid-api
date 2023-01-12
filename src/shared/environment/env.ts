import { randomUUID } from 'crypto'

export const Env = {
  PORT: process.env.SERVER_PORT || '',
  JWT_SECRET: process.env.JWT_SECRET || randomUUID(),
}