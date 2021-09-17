import { Size } from '../../sizes/schemas/size.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsMongoId, IsNotEmpty, ValidateIf } from 'class-validator';
import { NumberPersons } from '../../number-persons/schemas/number-persons.schema';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';

class NutritionalValue {
  @ApiProperty({ required: false, example: '100' })
  @Allow()
  proteins: string;

  @ApiProperty({ required: false, example: '100' })
  @Allow()
  fats: string;

  @ApiProperty({ required: false, example: '100' })
  @Allow()
  carbohydrates: string;

  @ApiProperty({ required: false, example: '100/200' })
  @Allow()
  energyValue: string;

  @ApiProperty({ required: false, example: '100' })
  @Allow()
  weight: string;
}

export class ProductSizeDto {
  @ApiProperty({
    required: false,
    type: Size,
    example: '61368364fdbb50d36496ff60',
  })
  @ValidateIf((obj) => obj.size)
  @IsMongoId({
    message: ERRORS_MESSAGE_CODES.SIZE_IS_NOT_OBJECT_ID,
  })
  readonly size: Size;

  @ApiProperty({
    required: false,
    type: NumberPersons,
    example: '61368364fdbb50d36496ff60',
  })
  @ValidateIf((obj) => obj.persons)
  @IsMongoId({
    message: ERRORS_MESSAGE_CODES.PERSONS_IS_NOT_OBJECT_ID,
  })
  readonly persons: NumberPersons;

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
