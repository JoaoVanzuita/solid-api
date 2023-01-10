import { User } from '@entities/user'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>
  findByName(name: string): Promise<User[]>
  findById(id: string): Promise<User | null>
  save(user: User): Promise<void>
  update(user: User): Promise<void>

}