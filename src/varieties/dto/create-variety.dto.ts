import { IsNotEmpty } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVarietyDto {
  @ApiProperty({ example: 'traditional' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.VARIETY_TITLE_EMPTY}`,
  })
  readonly title: string;
}
