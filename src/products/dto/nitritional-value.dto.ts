import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NutritionalValue {
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
