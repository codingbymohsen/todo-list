import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem } from '../../models/todo-item.model';
import { TodoItem as TodoItemDocument } from '../schemas/todo-item.schema';

@Injectable()
export class MongoTodoItemRepository {
  constructor(
    @InjectModel(TodoItem.name)
    private readonly todoItemModel: Model<TodoItemDocument>,
  ) {}

  async findById(id: string): Promise<TodoItem> {
    const todoListDoc = await this.todoItemModel.findById(id).exec();
    return this.toDomain(todoListDoc);
  }

  async findByUserId(query: {
    userId: string;
    page: number;
    limit?: number;
  }): Promise<TodoItem[]> {
    const todoListDocs = await this.todoItemModel
      .find({ userId: query.userId })
      .skip(query.page * query.limit)
      .limit(query.limit)
      .exec();
    return todoListDocs.map((doc) => this.toDomain(doc));
  }

  async save(todoList: TodoItem): Promise<void> {
    const todoListDoc = new this.todoItemModel(this.toDocument(todoList));
    await todoListDoc.save();
  }
  async update(todoList: TodoItem): Promise<void> {
    await this.todoItemModel.updateOne(
      { _id: todoList.id },
      { $set: todoList },
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.todoItemModel.findByIdAndDelete(id).exec();
  }

  private toDomain(doc: TodoItemDocument): TodoItem {
    return new TodoItem(
      doc.title,
      doc.description,
      doc.priority,
      doc.todoListId,
      doc.id,
    );
  }

  private toDocument(todoItem: TodoItem): TodoItemDocument {
    return {
      _id: todoItem.id,
    } as TodoItemDocument;
  }
}
