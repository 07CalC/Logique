import { BaseRepository } from './BaseRepository';
import { users } from '@/db/schema';



export class UserRespository extends BaseRepository<typeof users> {
  constructor() {
    super(users)
  }

  async getUserByEmail(email: string) {
    const user = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
    return user;
  }
}
