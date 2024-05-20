import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../user/application/commands/create-user.command';
import { GetUserByNameQuery } from '../../user/application/queries/get-user-by-name.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createUser(@Body('name') name: string) {
    const command = new CreateUserCommand(name);
    return await this.commandBus.execute(command);
  }
  @Get('/:name')
  async getUser(@Param('name') name: string) {
    const query = new GetUserByNameQuery(name);
    return this.queryBus.execute(query);
  }
}
