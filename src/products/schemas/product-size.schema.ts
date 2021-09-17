import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Size } from '../../sizes/schemas/size.schema';
import { ProductNutritionalValue } from './product-nutritional-value.schema';

@Schema()
export class ProductSize {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: false })
  size: Size;
  @Prop()
  price: string;
  @Prop()
  nutritionalValue: ProductNutritionalValue;
}
