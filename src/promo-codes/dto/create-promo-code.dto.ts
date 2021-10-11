import { ObjectId } from 'mongoose';
import {
  Allow,
  IsNotEmpty,
  IsMongoId,
  IsString,
  IsBoolean,
  ValidateIf,
} from 'class-validator';

export class CreatePromoCodeDto {
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @IsNotEmpty()
  @IsString()
  readonly discount: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly percent: boolean;

  @ValidateIf((obj) => obj.products?.length)
  @IsMongoId({ each: true })
  readonly products: ObjectId[];

  @ValidateIf((obj) => obj.categories?.length)
  @IsMongoId({ each: true })
  readonly categories: ObjectId[];

  @Allow()
  readonly _id: ObjectId;
}
