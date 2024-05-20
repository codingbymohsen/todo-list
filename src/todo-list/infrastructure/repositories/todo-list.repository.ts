import { TodoList } from '../../../todo-list/models/todo-list.model';

export interface ITodoListRepository {
  findById(id: string): Promise<TodoList>;
  findByUserId(query: {
    userId: string;
    page: number;
    limit?: number;
  }): Promise<TodoList[]>;
  save(todoList: TodoList): Promise<void>;
  deleteById(id: string): Promise<void>;
}
