import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
