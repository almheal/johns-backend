import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export type PromoCodeDocument = PromoCode & Document;

@Schema()
export class PromoCode extends Document {
  @Prop({ unique: true })
  code: string;

  @Prop()
  discount: string;

  @Prop()
  percent: boolean;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false,
      default: [],
    },
  ])
  products: ObjectId[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
      default: [],
    },
  ])
  categories: ObjectId[];
}

export const PromoCodeSchema = SchemaFactory.createForClass(PromoCode);
