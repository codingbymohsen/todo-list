import { User } from '../models/user.model';

export interface IUserRepository {
  findById(id: string): Promise<User>;
  findByName(name: string): Promise<User[]>;
  save(todoList: User): Promise<void>;
  deleteById(id: string): Promise<void>;
}
