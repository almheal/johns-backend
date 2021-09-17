import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Size, SizeDocument } from './schemas/size.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateSizeDto } from './dto/create-size.dto';

@Injectable()
export class SizesService {
  constructor(@InjectModel('Size') private sizeModel: Model<SizeDocument>) {}

  async create(dto: CreateSizeDto): Promise<Size> {
    const createdSize = new this.sizeModel(dto);
    return createdSize.save();
  }

  async getAll(): Promise<Size[]> {
    return this.sizeModel.find();
  }

  async get(id: string | ObjectId): Promise<Size> {
    return this.sizeModel.findById(id);
  }

  async update(id: string | ObjectId, dto: CreateSizeDto): Promise<Size> {
    return this.sizeModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string | ObjectId): Promise<Size> {
    return this.sizeModel.findByIdAndDelete(id);
  }
}
