import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Tag, TagDocument } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel('Tag') private tagModel: Model<TagDocument>) {}

  async create(dto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel(dto);
    return createdTag.save();
  }

  async getAll({ limit = 0, skip = 0, length = 'true' }) {
    const tags = await this.tagModel
      .find()
      .skip(Number(skip))
      .limit(Number(limit));

    if (length === 'true') {
      const count = await this.tagModel.countDocuments({});
      return {
        data: tags,
        length: count,
      };
    } else {
      return tags;
    }
  }

  async get(id: string | ObjectId): Promise<Tag> {
    return this.tagModel.findById(id);
  }

  async update(id: string | ObjectId, dto: CreateTagDto): Promise<Tag> {
    return this.tagModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string | ObjectId): Promise<Tag> {
    return this.tagModel.findByIdAndDelete(id);
  }
}
