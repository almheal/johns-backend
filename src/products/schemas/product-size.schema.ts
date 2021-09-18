import { Prop, Schema } from '@nestjs/mongoose';
import { ProductNutritionalValue } from './product-nutritional-value.schema';
import * as mongoose from 'mongoose';

@Schema()
export class ProductSize {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  size: Size;
  @Prop()
  price: string;
  @Prop()
  nutritionalValue: ProductNutritionalValue;
}

@Schema()
class Size {
  @Prop({ required: false })
  title: string;
  @Prop({ required: false })
  unit: string;
}
