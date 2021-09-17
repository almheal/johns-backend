import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient, IngredientDocument } from './schemas/ingredient.schema';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel('Ingredient')
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  async create(dto: CreateIngredientDto): Promise<Ingredient> {
    const createdIngredient = new this.ingredientModel(dto);
    return createdIngredient.save();
  }

  async getAll({ limit = 0, skip = 0 }): Promise<Ingredient[]> {
    return this.ingredientModel.find().skip(Number(skip)).limit(Number(limit));
  }

  async get(id: string | ObjectId): Promise<Ingredient> {
    return this.ingredientModel.findById(id);
  }

  async update(
    id: string | ObjectId,
    dto: CreateIngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string | ObjectId): Promise<Ingredient> {
    return this.ingredientModel.findByIdAndDelete(id);
  }
}
