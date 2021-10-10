import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AddressDelivery {
  @Prop()
  address: string;

  @Prop()
  apartment: string;

  @Prop()
  floor: string;

  @Prop()
  intercom: string;

  @Prop()
  entrance: string;
}

export const AddressDeliverySchema =
  SchemaFactory.createForClass(AddressDelivery);
