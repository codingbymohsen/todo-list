export class TodoItem {
  constructor(
    public title: string,
    public description: string,
    public priority: number,
    public readonly todoListId: string,
    public readonly id?: string,
  ) {}

  changePriority?(newPriority: number) {
    this.priority = newPriority;
  }
}
