import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodoListRepository } from './todo-list.repository';
import { TodoList } from '../../models/todo-list.model';
import { TodoList as TodoListDocument } from '../schemas/todo-list.schema';

@Injectable()
export class MongoTodoListRepository implements ITodoListRepository {
  constructor(
    @InjectModel(TodoListDocument.name)
    private readonly todoListModel: Model<TodoListDocument>,
  ) {}

  async findById(id: string): Promise<TodoList> {
    const todoListDoc = await this.todoListModel.findById(id).exec();
    return this.toDomain(todoListDoc);
  }

  async findByUserId(query: {
    userId: string;
    page: number;
    limit?: number;
  }): Promise<TodoList[]> {
    const todoListDocs = await this.todoListModel
      .find({ userId: query.userId })
      .skip(query.page * query.limit)
      .limit(query.limit)
      .sort({ 'items.priority': 'desc' })
      .exec();
    return todoListDocs.map((doc) => this.toDomain(doc));
  }

  async save(todoList: TodoList): Promise<void> {
    const todoListDoc = new this.todoListModel(this.toDocument(todoList));
    await todoListDoc.save();
  }
  async update(todoList: TodoList): Promise<void> {
    await this.todoListModel.updateOne(
      { _id: todoList.id },
      { $set: todoList },
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.todoListModel.findByIdAndDelete(id).exec();
  }

  private toDomain(doc: TodoListDocument): TodoList {
    return new TodoList(doc.userId, doc.title, doc.items, doc.id);
  }

  private toDocument(todoList: TodoList): TodoListDocument {
    return {
      _id: todoList.id,
      userId: todoList.userId,
      title: todoList.title,
      items: todoList.items,
    } as TodoListDocument;
  }
}
