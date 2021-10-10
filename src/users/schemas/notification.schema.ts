import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Notification {
  @Prop({ default: false })
  sms: boolean;

  @Prop({ default: false })
  company: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
