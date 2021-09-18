import { Prop, Schema } from '@nestjs/mongoose';
import { ProductSize } from './product-size.schema';

@Schema()
export class ProductOption {
  @Prop({ required: false })
  variety: string;
  @Prop()
  img: string;
  @Prop()
  sizes: ProductSize[];
}
