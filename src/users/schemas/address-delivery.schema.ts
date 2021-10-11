import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AddressDelivery {
  @Prop()
  address: string;

  @Prop({ required: false, default: '' })
  apartment: string;

  @Prop({ required: false, default: '' })
  floor: string;

  @Prop({ required: false, default: '' })
  intercom: string;

  @Prop({ required: false, default: '' })
  entrance: string;
}

export const AddressDeliverySchema =
  SchemaFactory.createForClass(AddressDelivery);
