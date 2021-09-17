import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { LocaleMessagesService } from '../locale-messages/locale-messages.service';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { Locale, LocalesDocument } from './schemas/locales.schema';

@Injectable()
export class LocalesService {
  constructor(
    @InjectModel('Locales') private localesModel: Model<LocalesDocument>,
    private localeMessagesService: LocaleMessagesService,
  ) {}

  async create(dto: CreateLocaleDto): Promise<Locale> {
    const createdLocale = new this.localesModel(dto);
    const locale = await createdLocale.save();
    const localeMessages = await this.localeMessagesService.create({
      locale: locale._id,
      messages: '{}',
    });

    locale.messages = localeMessages._id;

    const updatedLocale = await this.update(locale._id, locale);

    return updatedLocale;
  }

  async getAll(): Promise<Locale[]> {
    return this.localesModel.find();
  }

  async get(id: string | ObjectId): Promise<Locale> {
    return this.localesModel.findById(id);
  }

  async update(id: string | ObjectId, dto: CreateLocaleDto): Promise<Locale> {
    return this.localesModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string | ObjectId): Promise<Locale> {
    return this.localesModel.findByIdAndDelete(id);
  }
}
