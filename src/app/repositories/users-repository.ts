import { User } from '@entities/user'

export interface IUsersRepository {
  findByEmail(email: string): Promise<Omit<User, 'password'> | null>
  findByName(name: string): Promise<Omit<User, 'password'>[]>
  findById(id: string): Promise<Omit<User, 'password'> | null>
  findByEmailWithPass(email: string): Promise<User | null>
  delete(id: string): Promise<void>
  save(user: User): Promise<void>
  update(user: User): Promise<void>
}