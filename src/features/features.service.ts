import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { Feature, FeatureDocument } from './schemas/feature.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFeatureDto } from './dto/create-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectModel('Feature') private featureModel: Model<FeatureDocument>,
  ) {}

  async create(dto: CreateFeatureDto): Promise<Feature> {
    const createdFeature = new this.featureModel(dto);
    return createdFeature.save();
  }

  async getAll(): Promise<Feature[]> {
    return this.featureModel.find();
  }

  async get(id: string | ObjectId): Promise<Feature> {
    return this.featureModel.findById(id);
  }

  async update(id: string | ObjectId, dto: CreateFeatureDto): Promise<Feature> {
    return this.featureModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string | ObjectId): Promise<Feature> {
    return this.featureModel.findByIdAndDelete(id);
  }
}
