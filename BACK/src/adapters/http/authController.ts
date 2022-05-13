import { User } from '../../domain/entity/User';
import { AuthUseCase } from '../../domain/useCase/Auth/authUseCase';
import { SqliteCardRepository as DatabaseImplementation } from '../../infrastructure/sqlite/sqliteImplementation';

export class AuthController {
  async authenticate(
    name: string,
    password: string
  ): Promise<User | undefined> {
    const authUserUseCase = new AuthUseCase(new DatabaseImplementation());

    return await authUserUseCase.execute(name, password);
  }
}
