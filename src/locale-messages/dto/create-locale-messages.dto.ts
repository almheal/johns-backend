import { Locale } from '../../locales/schemas/locales.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class CreateLocaleMessagesDto {
  @ApiProperty({
    example: `{
      "products": {
        "pizza": {
          "title": "Super pizza"
         }
      }
    }`,
  })
  @Allow()
  readonly messages: string;
  @ApiProperty({
    example: '61368364fdbb50d36496ff60',
  })
  @Allow()
  readonly locale: Locale;
}
