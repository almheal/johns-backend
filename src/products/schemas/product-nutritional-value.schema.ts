import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ProductNutritionalValue {
  @Prop({ required: false })
  proteins: string;

  @Prop({ required: false })
  fats: string;

  @Prop({ required: false })
  carbohydrates: string;

  @Prop({ required: false })
  energyValue: string;

  @Prop({ required: false })
  weight: string;
}
