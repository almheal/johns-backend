import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { PromoCodesService } from './promo-codes.service';
import { PromoCode } from './schemas/promo-code.schema';

@Controller('promo-codes')
export class PromoCodesController {
  constructor(private promoCodesService: PromoCodesService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreatePromoCodeDto,
  ): Promise<PromoCode> {
    return this.promoCodesService.create(dto);
  }

  @Get()
  async getAll(@Query() query: { id: string | ObjectId; code: string }) {
    return this.promoCodesService.getAll(query);
  }

  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreatePromoCodeDto,
  ): Promise<PromoCode> {
    return this.promoCodesService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId): Promise<PromoCode> {
    return this.promoCodesService.delete(id);
  }
}
