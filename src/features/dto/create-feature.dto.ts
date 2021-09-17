import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';

export class CreateFeatureDto {
  @ApiProperty({ example: 'spicy' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.FEATURE_TITLE_EMPTY}`,
  })
  readonly title: string;

  @ApiProperty({ example: './icons/spicy.svg' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.FEATURE_ICON_EMPTY}`,
  })
  readonly icon: string;
}
