import { IsNotEmpty, Length } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from 'src/errors/errors-const';

export class PaymentCardDto {
  @IsNotEmpty({
    message: ERRORS_MESSAGE_CODES.INCORRENT_PAYMENT_CARD,
  })
  @Length(16, 16, {
    message: ERRORS_MESSAGE_CODES.INCORRENT_PAYMENT_CARD,
  })
  cardNumber: string;

  @Length(5, 5, {
    message: ERRORS_MESSAGE_CODES.INCORRENT_PAYMENT_CARD,
  })
  @IsNotEmpty({
    message: ERRORS_MESSAGE_CODES.INCORRENT_PAYMENT_CARD,
  })
  MY: string;

  @IsNotEmpty({
    message: ERRORS_MESSAGE_CODES.INCORRENT_PAYMENT_CARD,
  })
  holderName: string;

  @Length(3, 3, {
    message: ERRORS_MESSAGE_CODES.INCORRENT_PAYMENT_CARD,
  })
  @IsNotEmpty({
    message: ERRORS_MESSAGE_CODES.INCORRENT_PAYMENT_CARD,
  })
  cvv: string;
}
