import { ApiProperty } from '@nestjs/swagger';
import { Variety } from '../../varieties/schemas/variety.schema';
import {
  Allow,
  ArrayNotEmpty,
  IsMongoId,
  IsNotEmpty,
  ValidateIf,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductSizeDto } from './create-product-size.dto';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { HttpException } from '@nestjs/common';

export class ProductOptionDto {
  @ApiProperty({
    required: false,
    type: Variety,
    example: '61368364fdbb50d36496ff60',
  })
  @ValidateIf((obj) => obj.variety)
  @IsMongoId({
    message: ERRORS_MESSAGE_CODES.VARIETY_IS_NOT_OBJECT_ID,
  })
  readonly variety: Variety;

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
