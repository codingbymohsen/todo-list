import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoItem, TodoItemSchema } from './todo-item.schema';

@Schema()
export class TodoList extends Document {
  @Prop()
  userId: string;

  @Prop()
  title: string;

  @Prop({ type: [TodoItemSchema] })
  items: TodoItem[];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
