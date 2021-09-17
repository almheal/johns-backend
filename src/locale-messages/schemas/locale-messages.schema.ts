import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Locale } from '../../locales/schemas/locales.schema';

export type LocaleMessagesDocument = LocaleMessages & Document;

@Schema()
export class LocaleMessages {
  @Prop()
  messages: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Locales' })
  locale: Locale;
}

export const LocaleMessagesSchema =
  SchemaFactory.createForClass(LocaleMessages);
