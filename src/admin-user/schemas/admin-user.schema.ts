import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from '../roles.enum';

export type AdminUserDocument = AdminUser & Document;

@Schema()
export class AdminUser {
  @Prop({ unique: true })
  name: string;
  @Prop()
  password: string;
  @Prop()
  roles: Roles[];
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
