import { TodoItem } from './todo-item.model';

export class TodoList {
  constructor(
    public readonly userId: string,
    public title: string,
    public items: TodoItem[] = [],
    public readonly id?: string,
  ) {}

  addItem(item: TodoItem) {
    if (this.items == null) this.items = [];
    this.items.push(item);
    this.items.sort((a, b) => a.priority - b.priority);
  }

  removeItem(itemId: string) {
    this.items = this.items.filter((item) => item.id !== itemId);
  }
}
