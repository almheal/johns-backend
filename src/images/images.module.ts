import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [ConfigModule, CloudinaryModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
