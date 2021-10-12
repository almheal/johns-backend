import { Module } from '@nestjs/common';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureSchema } from './schemas/feature.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Feature', schema: FeatureSchema }]),
    JwtModule.register({}),
  ],
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeaturesModule {}
