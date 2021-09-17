import {
  Allow,
  ArrayNotEmpty,
  IsMongoId,
  IsNotEmpty,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductOptionDto } from './create-product-option.dto';
import { Feature } from '../../features/schemas/feature.schema';
import { Tag } from '../../tags/schemas/tag.schema';
import { Ingredient } from '../../ingredients/schemas/ingredient.schema';
import { productOptionsApiExample } from './product-options-api-example';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';
import { Category } from '../../categories/schemas/category.schema';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({
    message: ERRORS_MESSAGE_CODES.PRODUCT_TITLE_EMPTY,
  })
  readonly title: string;

  @ApiProperty({ required: false })
  readonly description: string;

  @ApiProperty({
    required: false,
    type: Feature,
    isArray: true,
    example: ['61368364fdbb50d36496ff60'],
  })
  @ValidateIf((obj) => obj?.features?.length)
  @IsMongoId({
    message: ERRORS_MESSAGE_CODES.FEATURES_IS_NOT_OBJECT_ID,
    each: true,
  })
  readonly features: Feature[];

  @ApiProperty({
    required: false,
    type: Tag,
    isArray: true,
    example: ['61368364fdbb50d36496ff60'],
  })
  @ValidateIf((obj) => obj?.tags?.length)
  @IsMongoId({
    message: ERRORS_MESSAGE_CODES.TAGS_IS_NOT_OBJECT_ID,
    each: true,
  })
  readonly tags: Tag[];

  @ApiProperty({
    required: false,
    type: Ingredient,
    isArray: true,
    example: ['61368364fdbb50d36496ff60'],
  })
  @ValidateIf((obj) => obj?.ingredients?.length)
  @IsMongoId({
    message: ERRORS_MESSAGE_CODES.INGREDIENTS_IS_NOT_OBJECT_ID,
    each: true,
  })
  readonly ingredients: Ingredient[];

  @ApiProperty({
    example: [productOptionsApiExample],
    type: ProductOptionDto,
    isArray: true,
  })
  @ArrayNotEmpty({
    message: ERRORS_MESSAGE_CODES.PRODUCT_OPTIONS_EMPTY,
  })
  @ValidateNested({ each: true })
  @Type(() => ProductOptionDto)
  readonly options: ProductOptionDto[];

  @ApiProperty({
    example: '61368364fdbb50d36496ff60',
    type: Category,
  })
  @IsNotEmpty({
    message: ERRORS_MESSAGE_CODES.PRODUCT_CATEGORY_EMPTY,
  })
  @IsMongoId({
    message: ERRORS_MESSAGE_CODES.PRODUCT_CATEGORY_IS_NOT_OBJECT_ID,
  })
  readonly category: Category;
}
