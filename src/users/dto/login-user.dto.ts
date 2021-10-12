import { IsMobilePhone, MinLength } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { CONSTS } from '../../const/const';

export class LoginUserDto {
  @IsMobilePhone(
    'ru-RU',
    {},
    {
      message: ERRORS_MESSAGE_CODES.INCORRENT_PHONE_NUMBER,
    },
  )
  phoneNumber: string;

  @MinLength(CONSTS.PASSWORD_MIN_LENGTH, {
    message: ERRORS_MESSAGE_CODES.PASSWORD_LENGTH_LESS_MIN,
  })
  password: string;
}
