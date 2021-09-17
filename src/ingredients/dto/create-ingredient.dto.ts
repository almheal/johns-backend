import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';

export class CreateIngredientDto {
  @ApiProperty({ example: 'tomato' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.INGREDIENT_TITLE_EMPTY}`,
  })
  readonly title: string;

  @ApiProperty({ example: './icons/tomato' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.INGREDIENT_ICON_EMPTY}`,
  })
  readonly icon: string;

  @ApiProperty({ example: '89' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.INGREDIENT_PRICE_EMPTY}`,
  })
  readonly price: string;

  @ApiProperty({ example: 'vegetables' })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.INGREDIENT_CATEGORY_EMPTY}`,
  })
  readonly category: string;
}
