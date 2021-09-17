import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateNumberPersonsDto } from './dto/create-number-persons.dto';
import {
  NumberPersons,
  NumberPersonsDocument,
} from './schemas/number-persons.schema';

@Injectable()
export class NumberPersonsService {
  constructor(
    @InjectModel('NumberPersons')
    private numberPersonsModel: Model<NumberPersonsDocument>,
  ) {}

  async create(dto: CreateNumberPersonsDto): Promise<NumberPersons> {
    const createdNumberPersons = new this.numberPersonsModel(dto);
    return createdNumberPersons.save();
  }

  async getAll(): Promise<NumberPersons[]> {
    return this.numberPersonsModel.find();
  }

  async get(id: string | ObjectId): Promise<NumberPersons> {
    return this.numberPersonsModel.findById(id);
  }

  async update(
    id: string | ObjectId,
    dto: CreateNumberPersonsDto,
  ): Promise<NumberPersons> {
    return this.numberPersonsModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string | ObjectId): Promise<NumberPersons> {
    return this.numberPersonsModel.findByIdAndDelete(id);
  }
}
