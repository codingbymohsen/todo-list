import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoList } from '../../../models/todo-list.model';
import { Inject } from '@nestjs/common';
import { CreateTodoListCommand } from '../create-todo-list.command';
import { MongoTodoListRepository } from '../../../../todo-list/infrastructure/repositories/mongo-todo-list.repository';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(
    @Inject('ITodoListRepository')
    readonly todoListRepository: MongoTodoListRepository,
  ) {}

  async execute(command: CreateTodoListCommand): Promise<void> {
    const { userId, title } = command;
    const todoList = new TodoList(userId, title, null);
    await this.todoListRepository.save(todoList);
  }
}
