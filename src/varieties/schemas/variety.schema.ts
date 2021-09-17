import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VarietyDocument = Variety & Document;

@Schema()
export class Variety {
  @Prop()
  title: string;
}

export const VarietySchema = SchemaFactory.createForClass(Variety);
