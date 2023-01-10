import jestConfig from './jest.config'

export default {
  ...jestConfig,
  testEnvironment: './test/environment/prisma-environment-jest.ts',
  testRegex: '.e2e-spec.ts$'
}