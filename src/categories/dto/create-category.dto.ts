import { IsNotEmpty } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Pizza' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.CATEGORY_TITLE_EMPTY}`,
  })
  readonly title: string;
  @ApiProperty({ example: './images/pizza.png' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.CATEGORY_ICON_EMPTY}`,
  })
  readonly icon: string;
}
