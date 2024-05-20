import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../../todo-list/application/commands/create-todo-list.command';
import { FetchTodolistsQuery } from '../../todo-list/application/queries/fetch-todo-lists.query';
import { TodoItem } from '../../todo-list/models/todo-item.model';
import { AddTodolistItemCommand } from '../../todo-list/application/commands/add-todolist-item.command';
import { TodoList } from 'src/todo-list/models/todo-list.model';
import { UpdateTodoListCommand } from 'src/todo-list/application/commands/update-todo-list.command';

@Controller('todolists')
export class TodoListsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createTodoList(
    @Body('userId') userId: string,
    @Body('title') title: string,
  ) {
    const command = new CreateTodoListCommand(userId, title);
    await this.commandBus.execute(command);
  }

  @Get()
  async fetchTodoLists(
    @Query() queryPayload: { page: number; limit: number; userId: string },
  ) {
    const { page, limit, userId } = queryPayload;
    const query = new FetchTodolistsQuery({ page, limit, userId });
    return this.queryBus.execute(query);
  }

  @Patch()
  async addTodoItem(@Body() body: TodoItem) {
    const command = new AddTodolistItemCommand(body);
    return this.commandBus.execute(command);
  }

  @Patch(':id')
  async updateTodoList(@Param('id') id: string, @Body() body: TodoList) {
    const command = new UpdateTodoListCommand(
      id,
      body.userId,
      body.title,
      body.items,
    );
    return this.commandBus.execute(command);
  }
}
