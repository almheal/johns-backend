import { IsNotEmpty, IsBoolean } from 'class-validator';

export class NotificationDto {
  @IsNotEmpty()
  @IsBoolean()
  sms: boolean;

  @IsNotEmpty()
  @IsBoolean()
  company: boolean;
}
