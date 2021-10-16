import { IsEmail, IsMobilePhone } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';

export class CheckRegisterUserDto {
  @IsEmail(
    {},
    {
      message: ERRORS_MESSAGE_CODES.INCORRENT_EMAIL,
    },
  )
  readonly email: string;
  @IsMobilePhone(
    'ru-RU',
    {},
    {
      message: ERRORS_MESSAGE_CODES.INCORRENT_PHONE_NUMBER,
    },
  )
  readonly phoneNumber: string;
}
