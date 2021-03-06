import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  ArrayNotEmpty,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductSizeDto } from './create-product-size.dto';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';

export class ProductOptionDto {
  @ApiProperty({
    required: false,
    example: 'Traditional',
  })
  @Allow()
  readonly variety: string;

  @ApiProperty({ example: 'http://localhost:5000/product/123.png' })
  @IsNotEmpty({
    message: ERRORS_MESSAGE_CODES.PRODUCT_IMAGE_EMPTY,
  })
  readonly img: string;

  @ApiProperty({
    example: [ProductSizeDto],
    type: ProductSizeDto,
    isArray: true,
  })
  @ArrayNotEmpty({
    message: ERRORS_MESSAGE_CODES.PRODUCT_SIZES_EMPTY,
  })
  @ValidateNested({ each: true })
  @Type(() => ProductSizeDto)
  readonly sizes: ProductSizeDto[];
}
