import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../roles.enum';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { CONSTS } from '../../const/const';

export class CreateAdminUserDto {
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

  @ApiProperty({
    enum: [Roles.Admin, Roles.Developer, Roles.Employee],
    isArray: true,
    example: [Roles.Admin, Roles.Employee, Roles.Developer],
  })
  @IsArray({
    message: `${ERRORS_MESSAGE_CODES.ROLES_NOT_ARRAY}`,
  })
  @ArrayNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.ROLES_EMPTY}`,
  })
  @IsEnum(Roles, {
    each: true,
    message: `${ERRORS_MESSAGE_CODES.ROLE_UNKNOWN}`,
  })
  readonly roles: Roles[];
}
