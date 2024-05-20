import { TodoItem } from '../../../todo-list/models/todo-item.model';

export class UpdateTodoListCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly title: string,
    public readonly items: TodoItem[],
  ) {}
}
