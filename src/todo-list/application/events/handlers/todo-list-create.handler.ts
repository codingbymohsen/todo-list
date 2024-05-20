import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListCreatedEvent } from '../todo-list-created.event';

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedHandler
  implements IEventHandler<TodoListCreatedEvent>
{
  handle(event: TodoListCreatedEvent) {
    console.log('Todo List Created Event:', event);
  }
}
