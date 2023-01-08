import { User } from '@entities/user'
import { IUsersRepository } from '@modules/users/repositories/users-repository'

export class InMemoryUsersRepository implements IUsersRepository {

  public users: User[] = []

  findByEmail(email: string): Promise<User | null> {

    const user = this.users.find(user => user.email == email)

    if(user){
      return Promise.resolve(user)
    }

    return null
  }

  findByName(name: string): Promise<User[]> {

    const users = this.users.filter(user => user.name.includes(name))

    return Promise.resolve(users)
  }

  save(user: User): Promise<void> {
    this.users.push(user)

    return null
  }
}