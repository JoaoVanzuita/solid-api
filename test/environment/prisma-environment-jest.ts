import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment'
import { exec } from 'child_process'
import { randomUUID } from 'crypto'
import dotenv from 'dotenv'
import NodeEnvironment from 'jest-environment-node'
import { Client } from 'pg'
import util from 'util'

dotenv.config({ path: '.env.test' })

const execSync = util.promisify(exec)

const prismaBinary = './node_modules/.bin/prisma'

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string
  private connectionString: string

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)

    const dbHost = process.env.DB_HOST
    const dbPort = process.env.DB_PORT
    const dbUser = process.env.POSTGRES_USER
    const dbPass = process.env.POSTGRES_PASSWORD
    const dbName = process.env.POSTGRES_DB

    this.schema = `test_${randomUUID()}`
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