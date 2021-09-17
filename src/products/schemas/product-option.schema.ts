import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Variety } from '../../varieties/schemas/variety.schema';
import { ProductSize } from './product-size.schema';

@Schema()
export class ProductOption {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variety',
    required: false,
  })
  variety: Variety;
  @Prop()
  img: string;
  @Prop()
  sizes: ProductSize[];
}
