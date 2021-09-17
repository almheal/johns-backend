import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Feature } from '../../features/schemas/feature.schema';
import { Tag } from '../../tags/schemas/tag.schema';
import { Ingredient } from '../../ingredients/schemas/ingredient.schema';
import { ProductOption } from './product-option.schema';
import { Category } from '../../categories/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'Feature', required: false },
  ])
  features: Feature[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: false }])
  tags: Tag[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: false,
    },
  ])
  ingredients: Ingredient[];

  @Prop()
  options: ProductOption[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
