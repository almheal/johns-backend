import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { LocaleMessages } from '../../locale-messages/schemas/locale-messages.schema';

export type LocalesDocument = Locale & Document;

@Schema()
export class Locale {
  @Prop()
  title: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LocaleMessages' })
  messages: LocaleMessages;
}

export const LocaleSchema = SchemaFactory.createForClass(Locale);
