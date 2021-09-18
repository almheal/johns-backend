import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(dto);
    return createdProduct.save();
  }

  async getAll({ limit = 0, skip = 0 }): Promise<Product[]> {
    return this.productModel
      .find()
      .populate('features')
      .populate('tags')
      .populate('ingredients')
      .populate('category')
      .populate({
        path: 'options',
        populate: {
          path: 'variety',
          model: 'Variety',
        },
      })
      .populate({
        path: 'options',
        populate: {
          path: 'sizes',
          populate: {
            path: 'size',
            model: 'Size',
          },
        },
      })
      .populate({
        path: 'options',
        populate: {
          path: 'sizes',
          populate: {
            path: 'persons',
            model: 'NumberPersons',
          },
        },
      })
      .skip(Number(skip))
      .limit(Number(limit));
  }

  async get(id: string | ObjectId): Promise<Product> {
    return this.productModel.findById(id);
  }

  async update(id: string | ObjectId, dto: CreateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string | ObjectId): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
}
