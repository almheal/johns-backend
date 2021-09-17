import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  title: string;
  @Prop()
  icon: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
