import { execSync } from 'child_process'
import dotenv from 'dotenv'
import NodeEnvironment from 'jest-environment-node'
import { resolve } from 'path'
import { v4 as uuid } from 'uuid'

dotenv.config({
  path: resolve(__dirname, '../../', '.env.test')
})

const prismaBinary = resolve(__dirname, '../../', 'node_modules', '.bin', 'prisma')

class CustomEnvironment extends NodeEnvironment {

  constructor(config) {
    super(config)
    this.connectionString = `${process.env.DATABASE_URL}${uuid()}`
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    execSync(`DATABASE_URL=${process.env.DATABASE_URL} ${prismaBinary} db push --force-reset --skip-generate `)
  }
}

export default CustomEnvironment