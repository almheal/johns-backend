import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateLocaleMessagesDto } from './dto/create-locale-messages.dto';
import {
  LocaleMessages,
  LocaleMessagesDocument,
} from './schemas/locale-messages.schema';

@Injectable()
export class LocaleMessagesService {
  constructor(
    @InjectModel('LocaleMessages')
    private localeMessagesModel: Model<LocaleMessagesDocument>,
  ) {}

  async create(dto: CreateLocaleMessagesDto): Promise<LocaleMessagesDocument> {
    const createdLocaleMessages = new this.localeMessagesModel(dto);
    return createdLocaleMessages.save();
  }

  async getAll(): Promise<LocaleMessages[]> {
    return this.localeMessagesModel.find();
  }

  async get(id: string | ObjectId): Promise<LocaleMessages> {
    return this.localeMessagesModel.findById(id);
  }

  async update(id: string | ObjectId, dto: CreateLocaleMessagesDto) {
    return this.localeMessagesModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string | ObjectId): Promise<LocaleMessages> {
    return this.localeMessagesModel.findByIdAndDelete(id);
  }
}
