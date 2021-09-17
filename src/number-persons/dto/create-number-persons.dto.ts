import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';

export class CreateNumberPersonsDto {
  @ApiProperty({ example: '1-2' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.NUMBER_PERSONS_TITLE_EMPTY}`,
  })
  readonly title: string;
}
