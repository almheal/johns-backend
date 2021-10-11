import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromoCodesController } from './promo-codes.controller';
import { PromoCodesService } from './promo-codes.service';
import { PromoCodeSchema } from './schemas/promo-code.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PromoCode', schema: PromoCodeSchema }]),
  ],
  controllers: [PromoCodesController],
  providers: [PromoCodesService],
})
export class PromoCodesModule {}
