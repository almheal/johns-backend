import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';

export class CreateSizeDto {
  @ApiProperty({ example: '23' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.SIZE_TITLE_EMPTY}`,
  })
  readonly title: string;

  @ApiProperty({ example: 'см' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.SIZE_UNIT_EMPTY}`,
  })
  readonly unit: string;
}
