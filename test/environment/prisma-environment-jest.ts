import { exec } from 'node:child_process'
import util from 'node:util'

import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment'
import dotenv from 'dotenv'
import NodeEnvironment from 'jest-environment-node'
import { Client } from 'pg'
import { v4 as uuid } from 'uuid'

dotenv.config({ path: '.env.test' })

const execSync = util.promisify(exec)

const prismaBinary = './node_modules/.bin/prisma'

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string
  private connectionString: string

  constructor(config: JestEnvironmentConfig, _context: EnvironmentContext) {
    super(config, _context)

    const dbUser = process.env.DB_USER
    const dbPass = process.env.DB_PASS
    const dbHost = process.env.DB_HOST
    const dbPort = process.env.DB_PORT
    const dbName = process.env.DB_NAME

    this.schema = `test_${uuid()}`
    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    await execSync(`${prismaBinary} migrate deploy`)

    return super.setup()
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    })

    await client.connect()
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
    await client.end()
  }
}