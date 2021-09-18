import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { SizeDto } from './size.dto';
import { NutritionalValue } from './nitritional-value.dto';

export class ProductSizeDto {
  @ApiProperty({
    required: false,
    type: SizeDto,
    example: '61368364fdbb50d36496ff60',
  })
  @Allow()
  readonly size: SizeDto;

  @ApiProperty({
    required: false,
    example: '1-2',
  })
  @Allow()
  readonly persons: string;

  @ApiProperty({ example: '124' })
  @IsNotEmpty({
    message: ERRORS_MESSAGE_CODES.PRODUCT_PRICE_EMPTY,
  })
  price: string;

  @ApiProperty({
    required: false,
    type: NutritionalValue,
    example: NutritionalValue,
  })
  @Allow()
  nutritionalValue: NutritionalValue;
}
