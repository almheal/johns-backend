import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SizeDocument = Size & Document;

@Schema()
export class Size {
  @Prop()
  title: string;
  @Prop()
  unit: string;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
