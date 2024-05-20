import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddTodolistItemCommand } from '../add-todolist-item.command';
import { TodoList } from '../../../../todo-list/models/todo-list.model';
import { Inject } from '@nestjs/common';
import { MongoTodoListRepository } from '../../../../todo-list/infrastructure/repositories/mongo-todo-list.repository';
import { MongoTodoItemRepository } from '../../../../todo-list/infrastructure/repositories/mongo-todo-item.repository';

@CommandHandler(AddTodolistItemCommand)
export class AddtodolistItemHandler implements ICommandHandler {
  constructor(
    @Inject('ITodoListRepository')
    readonly todolistRepository: MongoTodoListRepository,
    @Inject('TodoItemRepository')
    readonly todoItemRepository: MongoTodoItemRepository,
  ) {}
  async execute(command: AddTodolistItemCommand): Promise<TodoList> {
    const todolist: TodoList = await this.todolistRepository.findById(
      command.item.todoListId,
    );
    await this.todoItemRepository.save(command.item);
    todolist.addItem(command.item);
    await this.todolistRepository.update(todolist);
    return todolist;
    throw new Error('Method not implemented.');
  }
}
