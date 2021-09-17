import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NumberPersonsDocument = NumberPersons & Document;

@Schema()
export class NumberPersons {
  @Prop()
  title: string;
}

export const NumberPersonsSchema = SchemaFactory.createForClass(NumberPersons);
