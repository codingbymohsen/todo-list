import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoList } from '../../../models/todo-list.model';
import { Inject } from '@nestjs/common';
import { MongoTodoListRepository } from '../../../infrastructure/repositories/mongo-todo-list.repository';
import { UpdateTodoListCommand } from '../update-todo-list.command';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(
    @Inject('ITodoListRepository')
    readonly todoListRepository: MongoTodoListRepository,
  ) {}

  async execute(command: UpdateTodoListCommand): Promise<void> {
    const { userId, title, items, id } = command;
    const todoList = new TodoList(userId, title, items, id);
    await this.todoListRepository.update(todoList);
  }
}
