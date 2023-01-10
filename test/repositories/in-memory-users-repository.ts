import { User } from 'src/app/entities/user'
import { IUsersRepository } from 'src/app/repositories/users-repository'

export class InMemoryUsersRepository implements IUsersRepository {

  public users: User[] = []

  findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id)

    return Promise.resolve(user)
  }

  update(user: User): Promise<void> {

    const userIndex = this.users.findIndex(item => item.id === user.id)

    if(userIndex < 0) return

    this.users[userIndex] = user
  }

  findByEmail(email: string): Promise<User | null> {

    const user = this.users.find(user => user.email == email)

    if (user) {
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