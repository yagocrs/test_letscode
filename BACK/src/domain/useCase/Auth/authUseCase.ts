import { User } from '../../../domain/entity/User';
import { UserRepository } from '../../../domain/ports/UserRepository';

export class AuthUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(name: string, password: string): Promise<User | undefined> {
    const user = await this.repository.authenticate(name, password);

    if (!user) {
      return undefined;
    }

    return user;
  }
}
