import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocaleMessagesModule } from 'src/locale-messages/locale-messages.module';
import { LocalesController } from './locales.controller';
import { LocalesService } from './locales.service';
import { LocaleSchema } from './schemas/locales.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Locales', schema: LocaleSchema }]),
    LocaleMessagesModule,
  ],
  controllers: [LocalesController],
  providers: [LocalesService],
})
export class LocalesModule {}
