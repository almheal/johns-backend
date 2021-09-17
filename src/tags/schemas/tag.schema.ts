import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema()
export class Tag {
  @Prop()
  title: string;
  @Prop()
  backgroundColor: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
