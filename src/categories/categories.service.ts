import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(dto);
    return await createdCategory.save();
  }
  async getAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }
  async get(id: string | ObjectId): Promise<Category> {
    return this.categoryModel.findById(id);
  }
  async update(
    id: string | ObjectId,
    dto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, dto, { new: true });
  }
  async delete(id: string | ObjectId): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
