import { User } from 'src/app/entities/user'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>
  findByName(name: string): Promise<User[]>
  save(user: User): Promise<void>
}