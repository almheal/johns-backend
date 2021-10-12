import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientSchema } from './schemas/ingredient.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ingredient', schema: IngredientSchema },
    ]),
    AuthModule,
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
