import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Query,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Response } from 'express';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { PromoCodesService } from './promo-codes.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { SUCCESS_MESSAGE_CODES } from '../const/success-const';

@Controller('promo-codes')
export class PromoCodesController {
  constructor(private promoCodesService: PromoCodesService) {}

  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreatePromoCodeDto,
    @Res() res: Response,
  ) {
    const data = await this.promoCodesService.create(dto);
    res
      .status(HttpStatus.CREATED)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.CREATED_PROMO_CODE] });
  }

  @Get(':code')
  async get(@Param('code') code: string) {
    return this.promoCodesService.get({ code });
  }

  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Get()
  async getAll(
    @Query()
    query: {
      id: string | ObjectId;
      code: string;
      skip?: string | number;
      limit?: string | number;
      length?: string;
    },
  ) {
    return this.promoCodesService.getAll(query);
  }

  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreatePromoCodeDto,
    @Res() res: Response,
  ) {
    const data = await this.promoCodesService.update(id, dto);
    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.UPDATED_PROMO_CODE] });
  }

  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId, @Res() res: Response) {
    const data = await this.promoCodesService.delete(id);
    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.DELETED_PROMO_CODE] });
  }
}
