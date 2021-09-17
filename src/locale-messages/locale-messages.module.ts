import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocaleMessagesController } from './locale-messages.controller';
import { LocaleMessagesService } from './locale-messages.service';
import { LocaleMessagesSchema } from './schemas/locale-messages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'LocaleMessages', schema: LocaleMessagesSchema },
    ]),
  ],
  controllers: [LocaleMessagesController],
  providers: [LocaleMessagesService],
  exports: [LocaleMessagesService],
})
export class LocaleMessagesModule {}
