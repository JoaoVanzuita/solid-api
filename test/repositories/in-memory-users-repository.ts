import { User } from 'src/app/entities/user'
import { IUsersRepository } from 'src/app/repositories/users-repository'

export class InMemoryUsersRepository implements IUsersRepository {

  public users: User[] = []

  findByEmail(email: string): Promise<Omit<User, 'password'> | null> {

    const user = this.users.find(user => user.email == email)

    if (user) {

      return Promise.resolve({
        id: user.id,
        name: user.name,
        email: user.email
      })
    }

    return null
  }

  findByName(name: string): Promise<Omit<User, 'password'>[]> {

    const users: Omit<User, 'password'>[] = this.users.filter(user => user.name.includes(name))

    users.forEach((user, index) => {
      users[index] = {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })

    return Promise.resolve(users)
  }

  findById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = this.users.find(user => user.id === id)

    if (user) {
      return Promise.resolve({
        id: user.id,
        name: user.name,
        email: user.email
      })
    }

    return null
  }

  findByEmailWithPass(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)

    if (user) {
      return Promise.resolve(user)
    }

    return null
  }

  delete(id: string): Promise<void> {

    this.users = this.users.filter(user => user.id != id)

    return null
  }

  save(user: User): Promise<void> {
    this.users.push(user)

    return null
  }

  update(user: User): Promise<void> {

    const userIndex = this.users.findIndex(item => item.id === user.id)

    if (userIndex < 0) return

    this.users[userIndex] = user
  }
}