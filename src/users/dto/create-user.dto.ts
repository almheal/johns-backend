import {
  IsNotEmpty,
  IsMobilePhone,
  IsEmail,
  MinLength,
  IsISO8601,
  ValidateIf,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { CONSTS } from '../../const/const';
import { DeliveryAddressDto } from './delivery-address.dto';
import { Type } from 'class-transformer';
import { PaymentCardDto } from './payment-card.dto';
import { NotificationDto } from './notification.dto';

export class CreateUserDto {
  @IsNotEmpty({
    message: ERRORS_MESSAGE_CODES.USER_NAME_IS_EMPTY,
  })
  name: string;

  @IsMobilePhone(
    'ru-RU',
    {},
    {
      message: ERRORS_MESSAGE_CODES.INCORRENT_PHONE_NUMBER,
    },
  )
  phoneNumber: string;

  @IsEmail(
    {},
    {
      message: ERRORS_MESSAGE_CODES.INCORRENT_EMAIL,
    },
  )
  email: string;

  @MinLength(CONSTS.PASSWORD_MIN_LENGTH, {
    message: ERRORS_MESSAGE_CODES.PASSWORD_LENGTH_LESS_MIN,
  })
  password: string;

  @ValidateIf((obj) => obj.dateOfBirth)
  @IsISO8601()
  dateOfBirth: string;

  @ValidateIf((obj) => obj.hasOwnProperty('deliveryAddresses'))
  @ValidateNested({ each: true })
  @Type(() => DeliveryAddressDto)
  @IsArray()
  deliveryAddresses: DeliveryAddressDto[];

  @ValidateIf((obj) => obj.hasOwnProperty('paymentCards'))
  @ValidateNested({ each: true })
  @Type(() => PaymentCardDto)
  @IsArray()
  paymentCards: PaymentCardDto[];

  @Type(() => NotificationDto)
  @ValidateNested()
  notifications: NotificationDto;
}
