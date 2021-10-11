import {
  ValidateIf,
  IsEmail,
  IsString,
  ValidateNested,
  IsObject,
  IsIn,
  IsNotEmpty,
  IsBoolean,
  IsMobilePhone,
  IsNotEmptyObject,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDeliveryDto } from '../../users/dto/address-delivery.dto';
import { CONSTS } from '../../const/const';
import { PaymentCardDto } from '../../users/dto/payment-card.dto';
import { CreateProductDto } from '../../products/dto/create-product.dto';

const PAYMENT_METHODS: string[] = [
  CONSTS.ORDER_PAYMENT_BY_CARD,
  CONSTS.ORDER_PAYMENT_CASH,
  CONSTS.ORDER_PAYMENT_CARD_TO_COURIER,
  CONSTS.ORDER_PAYMENT_GOOGLE_PAY,
];

const TIME_DELIVERY: string[] = [
  CONSTS.ORDER_DELIVERY_IN_TIME,
  CONSTS.ORDER_DELIVERY_AS_SOON,
];

const DELIVERY_METHODS: string[] = [
  CONSTS.ORDER_METHOD_DELIVERY,
  CONSTS.ORDER_METHOD_PICKUP,
];

export class CreateOrderDto {
  @ValidateIf((obj) => obj.name)
  @IsString()
  readonly name: string;

  @ValidateIf((obj) => obj.email)
  @IsEmail()
  readonly email: string;

  @ValidateIf((obj) => obj.phoneNumber)
  @IsMobilePhone('ru-RU')
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(DELIVERY_METHODS)
  readonly deliveryMethod: string;

  @Type(() => AddressDeliveryDto)
  @ValidateNested()
  @IsObject()
  readonly addressDelivery: AddressDeliveryDto;

  @IsString()
  @IsNotEmpty()
  @IsIn(TIME_DELIVERY)
  readonly timeOfDelivery: string;

  @ValidateIf((obj) => obj.timeOfDelivery === CONSTS.ORDER_DELIVERY_IN_TIME)
  @IsString()
  @IsNotEmpty()
  readonly timeOfDay: string;

  @ValidateIf((obj) => obj.timeOfDelivery === CONSTS.ORDER_DELIVERY_IN_TIME)
  @IsString()
  @IsNotEmpty()
  readonly inTime: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(PAYMENT_METHODS)
  readonly paymentMethod: string;

  @ValidateIf((obj) => obj.paymentMethod === CONSTS.ORDER_PAYMENT_BY_CARD)
  @Type(() => PaymentCardDto)
  @ValidateNested()
  @IsObject()
  readonly paymentCard: PaymentCardDto;

  @ValidateIf((obj) => obj.oddMoney)
  @IsString()
  readonly oddMoney: string;

  @ValidateIf((obj) => obj.comment)
  @IsString()
  readonly comment: string;

  @IsBoolean()
  readonly contactless: boolean;

  @IsBoolean()
  readonly sms: boolean;

  @IsBoolean()
  readonly emailNewsletters: boolean;

  @ValidateIf((obj) => obj.promoCode)
  @IsString()
  readonly promoCode: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  @ArrayNotEmpty()
  readonly products: CreateProductDto[];
}
