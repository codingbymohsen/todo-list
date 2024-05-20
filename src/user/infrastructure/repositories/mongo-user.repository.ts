import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from './user.repository';
import { User } from '../../models/user.model';
import { User as UserDocument } from '../schemas/user.schema';

@Injectable()
export class MongoUserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByName(name: string): Promise<User> {
    const userDoc = await this.userModel.findOne({ name }).exec();
    return this.toDomain(userDoc);
  }

  async findByUserId(userId: string): Promise<User[]> {
    const userDocs = await this.userModel.find({ userId }).exec();
    return userDocs.map((doc) => this.toDomain(doc));
  }

  async save(user: User): Promise<void> {
    const userDoc = new this.userModel(this.toDocument(user));
    await userDoc.save();
  }

  async deleteById(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  private toDomain(doc: UserDocument): User {
    return new User(doc.name, doc.id);
  }

  private toDocument(user: User): UserDocument {
    return {
      _id: user.id,
      name: user.name,
    } as UserDocument;
  }
}
