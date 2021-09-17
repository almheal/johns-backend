import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { CONSTS } from '../../const/const';

export class LoginAdminUserDto {
  @ApiProperty({ example: 'ivanIvanov', uniqueItems: true })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.NAME_EMPTY}`,
  })
  readonly name: string;
  @ApiProperty({ example: 'superPassword' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.PASSWORD_EMPTY}`,
  })
  @MinLength(Number(CONSTS.PASSWORD_MIN_LENGTH), {
    message: `${ERRORS_MESSAGE_CODES.PASSWORD_LENGTH_LESS_MIN}`,
  })
  readonly password: string;
}
