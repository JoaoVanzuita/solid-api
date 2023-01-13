import { randomUUID } from 'crypto'

export class RefreshToken {
  public readonly id: string

  public expiresIn: number
  public userId: string

  constructor(props: Omit<RefreshToken, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = randomUUID()
    }
  }
}