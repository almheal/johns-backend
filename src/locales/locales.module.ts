import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocaleMessagesModule } from 'src/locale-messages/locale-messages.module';
import { LocalesController } from './locales.controller';
import { LocalesService } from './locales.service';
import { LocaleSchema } from './schemas/locales.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Locales', schema: LocaleSchema }]),
    LocaleMessagesModule,
    AuthModule,
  ],
  controllers: [LocalesController],
  providers: [LocalesService],
})
export class LocalesModule {}
