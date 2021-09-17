import { ApiProperty } from '@nestjs/swagger';

export class ErrorMessageCode {
  @ApiProperty({
    example: ['1', '2', '3'],
  })
  readonly message: string[];
}
