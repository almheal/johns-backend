import { Module } from '@nestjs/common';
import { SizesController } from './sizes.controller';
import { SizesService } from './sizes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SizeSchema } from './schemas/size.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Size', schema: SizeSchema }])],
  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}
