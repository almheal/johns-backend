import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NumberPersonsController } from './number-persons.controller';
import { NumberPersonsService } from './number-persons.service';
import { NumberPersonsSchema } from './schemas/number-persons.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NumberPersons', schema: NumberPersonsSchema },
    ]),
  ],
  controllers: [NumberPersonsController],
  providers: [NumberPersonsService],
})
export class NumberPersonsModule {}
