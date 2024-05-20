import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TodoItem extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  priority: number;

  @Prop()
  todoListId: string;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
