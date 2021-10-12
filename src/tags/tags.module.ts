import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './schemas/tag.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }]),
    AuthModule,
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
