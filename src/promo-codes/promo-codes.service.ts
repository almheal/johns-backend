import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { PromoCode, PromoCodeDocument } from './schemas/promo-code.schema';

@Injectable()
export class PromoCodesService {
  constructor(
    @InjectModel('PromoCode') private promoCodeModel: Model<PromoCodeDocument>,
  ) {}

  async create(dto: CreatePromoCodeDto) {
    const candidate = await this.get({ code: dto.code });
    if (candidate) {
      this.errorAlreadyExists();
    }
    const createdPromoCode = new this.promoCodeModel(dto);
    return createdPromoCode.save();
  }

  async getAll({ id, code }) {
    console.log('id', id, 'code', code);
    if (id || code) {
      return this.get({ id, code });
    }
    return this.promoCodeModel.find({});
  }

  async get({
    id,
    code,
  }: {
    id?: string | ObjectId;
    code?: string;
  }): Promise<PromoCode> {
    if (id) {
      return this.promoCodeModel.findById(id);
    }
    if (code) {
      return this.promoCodeModel.findOne({ code });
    }
  }

  async update(
    id: string | ObjectId,
    dto: CreatePromoCodeDto,
  ): Promise<PromoCode> {
    const candidate = await this.get({ code: dto.code });
    if (candidate && !candidate._id.equals(dto._id)) {
      this.errorAlreadyExists();
    }
    return this.promoCodeModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string | ObjectId): Promise<PromoCode> {
    return this.promoCodeModel.findByIdAndDelete(id);
  }

  private errorAlreadyExists() {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Code already exists',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
