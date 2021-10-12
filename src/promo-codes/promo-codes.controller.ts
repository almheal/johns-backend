import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { PromoCodesService } from './promo-codes.service';
import { PromoCode } from './schemas/promo-code.schema';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';

@Controller('promo-codes')
export class PromoCodesController {
  constructor(private promoCodesService: PromoCodesService) {}

  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreatePromoCodeDto,
  ): Promise<PromoCode> {
    return this.promoCodesService.create(dto);
  }

  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Get()
  async getAll(@Query() query: { id: string | ObjectId; code: string }) {
    return this.promoCodesService.getAll(query);
  }

  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreatePromoCodeDto,
  ): Promise<PromoCode> {
    return this.promoCodesService.update(id, dto);
  }

  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId): Promise<PromoCode> {
    return this.promoCodesService.delete(id);
  }
}
