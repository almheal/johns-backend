import { Module } from '@nestjs/common';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureSchema } from './schemas/feature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Feature', schema: FeatureSchema }]),
  ],
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeaturesModule {}
