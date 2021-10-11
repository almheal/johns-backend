import { IsNotEmpty, Allow } from 'class-validator';

export class AddressDeliveryDto {
  @IsNotEmpty()
  address: string;

  @Allow()
  apartment: string;

  @Allow()
  floor: string;

  @Allow()
  intercom: string;

  @Allow()
  entrance: string;
}
