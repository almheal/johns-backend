import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IngredientDocument = Ingredient & Document;

@Schema()
export class Ingredient {
  @Prop()
  title: string;
  @Prop()
  icon: string;
  @Prop()
  price: string;
  @Prop()
  category: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
