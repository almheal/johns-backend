import { LocaleMessages } from '../../locale-messages/schemas/locale-messages.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Allow } from 'class-validator';
import { ERRORS_MESSAGE_CODES } from '../../errors/errors-const';

export class CreateLocaleDto {
  @ApiProperty({
    example: 'ru',
  })
  @IsNotEmpty({
    message: `${ERRORS_MESSAGE_CODES.LOCALE_TITLE_EMPTY}`,
  })
  readonly title: string;

  @ApiProperty({
    example: '61368364fdbb50d36496ff60',
  })
  @Allow()
  readonly messages: LocaleMessages;
}
