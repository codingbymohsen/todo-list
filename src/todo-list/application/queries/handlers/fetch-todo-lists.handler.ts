import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FetchTodolistsQuery } from '../fetch-todo-lists.query';
import { TodoList } from '../../../../todo-list/models/todo-list.model';
import { MongoTodoListRepository } from '../../../../todo-list/infrastructure/repositories/mongo-todo-list.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(FetchTodolistsQuery)
export class FetchTodolistsHandler
  implements IQueryHandler<FetchTodolistsQuery>
{
  constructor(
    @Inject('ITodoListRepository')
    readonly todolistRepository: MongoTodoListRepository,
  ) {}
  async execute(query: FetchTodolistsQuery): Promise<TodoList[]> {
    const { userId, page, limit } = query.payload;
    const docs = await this.todolistRepository.findByUserId({
      userId,
      page,
      limit,
    });
    const result = [];
    docs.map((item) => {
      {
        if (item.items) item.items.sort((c, d) => d.priority - c.priority);
        result.push(item);
      }
    });
    return result;
  }
}
