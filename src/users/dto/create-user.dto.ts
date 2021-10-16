import {
  IsNotEmpty,
  IsMobilePhone,
  IsEmail,
  IsString,
  Allow,
  IsISO8601,
  ValidateIf,
  ValidateNested,
  IsArray,
  IsIn,
} from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { CONSTS } from '../../const/const';
import { AddressDeliveryDto } from './address-delivery.dto';
import { Type } from 'class-transformer';
import { PaymentCardDto } from './payment-card.dto';
import { NotificationDto } from './notification.dto';

const GENDERS = [CONSTS.GENDER_MALE, CONSTS.GENDER_FEMALE];

export class CreateUserDto {
  @IsNotEmpty({
    message: ERRORS_MESSAGE_CODES.USER_NAME_IS_EMPTY,
  })
  readonly name: string;

  @IsMobilePhone(
    'ru-RU',
    {},
    {
      message: ERRORS_MESSAGE_CODES.INCORRENT_PHONE_NUMBER,
    },
  )
  readonly phoneNumber: string;

  @ValidateIf((obj) => obj.img)
  @IsString({
    message: ERRORS_MESSAGE_CODES.IMG_IS_NOT_STRING,
  })
  readonly img: string;

  @ValidateIf((obj) => obj.gender)
  @IsString({
    message: ERRORS_MESSAGE_CODES.GENDER_IS_NOT_STRING,
  })
  @IsIn(GENDERS, {
    message: ERRORS_MESSAGE_CODES.INCORRENT_GENDER,
  })
  @Allow()
  readonly gender: string;

  @IsEmail(
    {},
    {
      message: ERRORS_MESSAGE_CODES.INCORRENT_EMAIL,
    },
  )
  readonly email: string;

  @ValidateIf((obj) => obj.dateOfBirth)
  @IsISO8601(
    {},
    {
      message: ERRORS_MESSAGE_CODES.INCORRENT_DATE_FORMAT,
    },
  )
  readonly dateOfBirth: string;

  @ValidateIf((obj) => obj.hasOwnProperty('deliveryAddresses'))
  @ValidateNested({ each: true })
  @Type(() => AddressDeliveryDto)
  @IsArray()
  readonly deliveryAddresses: AddressDeliveryDto[];

  @ValidateIf((obj) => obj.hasOwnProperty('paymentCards'))
  @ValidateNested({ each: true })
  @Type(() => PaymentCardDto)
  @IsArray()
  readonly paymentCards: PaymentCardDto[];

  @Type(() => NotificationDto)
  @ValidateNested()
  readonly notifications: NotificationDto;
}
