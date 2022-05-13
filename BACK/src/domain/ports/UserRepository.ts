import { User } from '../entity/User';

export interface UserRepository {
  authenticate: (name: string, password: string) => Promise<User | undefined>;
}
