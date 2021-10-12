import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  AddressDelivery,
  AddressDeliverySchema,
} from './address-delivery.schema';
import { Notification, NotificationSchema } from './notification.schema';
import { PaymentCard, PaymentCardSchema } from './payment-card.schema';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  dateOfBirth: string;

  @Prop([{ type: AddressDeliverySchema, required: false, default: [] }])
  deliveryAddresses: AddressDelivery[];

  @Prop([{ type: PaymentCardSchema, required: false, default: [] }])
  paymentCards: PaymentCard[];

  @Prop({ type: NotificationSchema, default: {} })
  notifications: Notification;
}

export const UserSchema = SchemaFactory.createForClass(User);
