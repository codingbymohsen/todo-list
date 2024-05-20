import { User } from '../../../user/models/user.model';

export interface IUserRepository {
  findByName(id: string): Promise<User>;
  findByUserId(userId: string): Promise<User[]>;
  save(todoList: User): Promise<void>;
  deleteById(id: string): Promise<void>;
}
