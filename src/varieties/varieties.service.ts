import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Variety, VarietyDocument } from './schemas/variety.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateVarietyDto } from './dto/create-variety.dto';

@Injectable()
export class VarietiesService {
  constructor(
    @InjectModel('Variety') private varietyModel: Model<VarietyDocument>,
  ) {}

  async create(dto: CreateVarietyDto): Promise<Variety> {
    const createdVariety = new this.varietyModel(dto);
    return createdVariety.save();
  }

  async getAll(): Promise<Variety[]> {
    return this.varietyModel.find();
  }

  async get(id: string | ObjectId): Promise<Variety> {
    return this.varietyModel.findById(id);
  }

  async update(id: string | ObjectId, dto: CreateVarietyDto): Promise<Variety> {
    return this.varietyModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string | ObjectId): Promise<Variety> {
    return this.varietyModel.findByIdAndDelete(id);
  }
}
