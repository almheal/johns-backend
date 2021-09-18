import { ApiProperty } from '@nestjs/swagger';

export class SizeDto {
  @ApiProperty({
    required: false,
    example: '23',
  })
  readonly title: string;
  @ApiProperty({
    required: false,
    example: 'cm',
  })
  readonly unit: string;
}
