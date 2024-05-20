import { Module } from '@nestjs/common';
import { TodoListsController } from './interfaces/controllers/todo-lists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListSchema } from './todo-list/infrastructure/schemas/todo-list.schema';
import { MongoTodoListRepository } from './todo-list/infrastructure/repositories/mongo-todo-list.repository';
import { CreateTodoListHandler } from './todo-list/application/commands/handlers/create-todo-list.handler';
import { TodoListCreatedHandler } from './todo-list/application/events/handlers/todo-list-create.handler';
import {
  TodoItem,
  TodoItemSchema,
} from './todo-list/infrastructure/schemas/todo-item.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './user/infrastructure/schemas/user.schema';
import { UsersController } from './interfaces/controllers/users.controller';
import { CreateUserHandler } from './user/application/commands/handlers/create-user.handler';
import { MongoUserRepository } from './user/infrastructure/repositories/mongo-user.repository';
import { GetUserByNameHandler } from './user/application/queries/handlers/get-user-by-name.handler';
import { FetchTodolistsHandler } from './todo-list/application/queries/handlers/fetch-todo-lists.handler';
import { AddtodolistItemHandler } from './todo-list/application/commands/handlers/add-todolist-item.handler';
import { MongoTodoItemRepository } from './todo-list/infrastructure/repositories/mongo-todo-item.repository';
import { UpdateTodoListCommand } from './todo-list/application/commands/update-todo-list.command';
import { UpdateTodoListHandler } from './todo-list/application/commands/handlers/update-todo-list.handler';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return { uri: configService.getOrThrow('DB_URL'), dbName: 'todo-list' };
      },
    }),
    MongooseModule.forFeature([
      { name: 'TodoList', schema: TodoListSchema },
      { name: TodoItem.name, schema: TodoItemSchema },
      { name: User.name, schema: UserSchema },
    ]),
    CqrsModule,
  ],
  controllers: [TodoListsController, UsersController],
  providers: [
    { provide: 'ITodoListRepository', useClass: MongoTodoListRepository },
    { provide: 'IUserRepository', useClass: MongoUserRepository },
    { provide: 'TodoItemRepository', useClass: MongoTodoItemRepository },
    CreateTodoListHandler,
    TodoListCreatedHandler,
    FetchTodolistsHandler,

    CreateUserHandler,
    GetUserByNameHandler,

    AddtodolistItemHandler,
    UpdateTodoListHandler,
  ],
})
export class AppModule {}
