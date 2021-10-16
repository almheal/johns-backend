import { MinLength } from 'class-validator';
import { CONSTS } from '../../const/const';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { CreateUserDto } from './create-user.dto';

export class CreateUserWithPasswordDto extends CreateUserDto {
  @MinLength(CONSTS.PASSWORD_MIN_LENGTH, {
    message: ERRORS_MESSAGE_CODES.PASSWORD_LENGTH_LESS_MIN,
  })
  readonly password: string;
}
