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

  async getAll({ limit = 0, skip = 0, length = 'true', category }) {
    const products = await this.productModel
      .find(category ? { category: category } : {})
      .populate('features')
      .populate('tags')
      .populate('ingredients')
      .populate('category')
      .skip(Number(skip))
      .limit(Number(limit));

    if (length === 'true') {
      const count = await this.productModel.countDocuments(
        category ? { category: category } : {},
      );
      return {
        data: products,
        length: count,
      };
    }

    return products;
  }

  async get(id: string | ObjectId): Promise<Product> {
    return this.productModel
      .findById(id)
      .populate('features')
      .populate('tags')
      .populate('ingredients')
      .populate('category');
  }

  async update(id: string | ObjectId, dto: CreateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string | ObjectId): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
}
