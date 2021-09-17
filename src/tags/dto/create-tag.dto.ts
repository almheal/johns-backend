import { IsNotEmpty } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    example: 'New',
  })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.TAG_TITLE_EMPTY}`,
  })
  readonly title: string;
  @ApiProperty({
    example: '#000',
  })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.TAG_BACKGOUND_COLOR_EMPTY}`,
  })
  readonly backgroundColor: string;
}
