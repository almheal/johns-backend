import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VarietySchema } from './schemas/variety.schema';
import { VarietiesController } from './varieties.controller';
import { VarietiesService } from './varieties.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Variety', schema: VarietySchema }]),
  ],
  controllers: [VarietiesController],
  providers: [VarietiesService],
})
export class VarietiesModule {}
