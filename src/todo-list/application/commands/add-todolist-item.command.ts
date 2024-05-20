import { TodoItem } from '../../../todo-list/models/todo-item.model';

export class AddTodolistItemCommand {
  constructor(public readonly item: TodoItem) {}
}
