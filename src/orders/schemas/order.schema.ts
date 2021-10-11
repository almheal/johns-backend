import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  AddressDelivery,
  AddressDeliverySchema,
} from '../../users/schemas/address-delivery.schema';
import {
  PaymentCard,
  PaymentCardSchema,
} from '../../users/schemas/payment-card.schema';
import { Product, ProductSchema } from '../../products/schemas/product.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: false, default: '' })
  name: string;

  @Prop({ required: false, default: '' })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  deliveryMethod: string;

  @Prop({ type: AddressDeliverySchema })
  addressDelivery: AddressDelivery;

  @Prop()
  timeOfDelivery: string;

  @Prop({ required: false, default: '' })
  timeOfDay: string;

  @Prop({ required: false, default: '' })
  inTime: string;

  @Prop()
  paymentMethod: string;

  @Prop({ type: PaymentCardSchema, required: false })
  paymentCard: PaymentCard;

  @Prop({ required: false, default: '' })
  oddMoney: string;

  @Prop({ required: false, default: '' })
  comment: string;

  @Prop()
  contactless: boolean;

  @Prop()
  sms: boolean;

  @Prop()
  emailNewsletters: boolean;

  @Prop({ required: false, default: '' })
  promoCode: string;

  @Prop([{ type: ProductSchema }])
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
