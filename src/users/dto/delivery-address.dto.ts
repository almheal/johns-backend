import { IsNotEmpty } from 'class-validator';

export class DeliveryAddressDto {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  apartment: string;

  @IsNotEmpty()
  floor: string;

  @IsNotEmpty()
  intercom: string;

  @IsNotEmpty()
  entrance: string;
}
