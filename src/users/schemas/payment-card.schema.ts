import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PaymentCard {
  @Prop()
  cardNumber: string;

  @Prop()
  MY: string;

  @Prop()
  holderName: string;

  @Prop()
  cvv: string;
}

export const PaymentCardSchema = SchemaFactory.createForClass(PaymentCard);
