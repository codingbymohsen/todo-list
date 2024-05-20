import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoListHandler } from './create-todo-list.handler';
import { ITodoListRepository } from '../../../infrastructure/repositories/todo-list.repository';
import { CreateTodoListCommand } from '../create-todo-list.command';

describe('CreateTodoListHandler', () => {
  let handler: CreateTodoListHandler;
  let repository: ITodoListRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTodoListHandler,
        {
          provide: 'ITodoListRepository',
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CreateTodoListHandler>(CreateTodoListHandler);
    repository = module.get<ITodoListRepository>('ITodoListRepository');
  });

  it('should create a todo list', async () => {
    await handler.execute(new CreateTodoListCommand('userId', 'title'));
    expect(repository.save).toHaveBeenCalled();
  });
});
