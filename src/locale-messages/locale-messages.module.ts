import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LocaleMessagesController } from './locale-messages.controller';
import { LocaleMessagesService } from './locale-messages.service';
import { LocaleMessagesSchema } from './schemas/locale-messages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'LocaleMessages', schema: LocaleMessagesSchema },
    ]),
    AuthModule,
  ],
  controllers: [LocaleMessagesController],
  providers: [LocaleMessagesService],
  exports: [LocaleMessagesService],
})
export class LocaleMessagesModule {}
