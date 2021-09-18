import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { LocalesService } from './locales.service';
import { Locale } from './schemas/locales.schema';
import { ObjectId } from 'mongoose';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageCode } from '../errors/error';
import { SUCCESS_MESSAGE_CODES } from '../const/success-const';

@ApiTags('Locales')
@Controller('locales')
export class LocalesController {
  constructor(private localesService: LocalesService) {}

  // Create
  @ApiResponse({
    status: 201,
    type: CreateLocaleDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateLocaleDto,
    @Res() res: Response,
  ) {
    const data = await this.localesService.create(dto);

    res
      .status(HttpStatus.CREATED)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.CREATED_LOCALE] });
  }

  // Get all
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateLocaleDto,
  })
  @ApiQuery({ name: 'skip', example: '1', required: false })
  @ApiQuery({ name: 'limit', example: '1', required: false })
  @Get()
  async getAll(@Query() query): Promise<Locale[]> {
    return this.localesService.getAll(query);
  }

  // Get
  @ApiResponse({
    status: 200,
    type: CreateLocaleDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Get(':id')
  async get(@Param('id') id: string | ObjectId): Promise<Locale> {
    return this.localesService.get(id);
  }

  // Update
  @ApiResponse({
    status: 200,
    type: CreateLocaleDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreateLocaleDto,
    @Res() res: Response,
  ) {
    const data = await this.localesService.update(id, dto);

    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.UPDATED_LOCALE] });
  }

  // Delete
  @ApiResponse({
    status: 200,
    type: CreateLocaleDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId, @Res() res: Response) {
    const data = await this.localesService.delete(id);

    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.DELETED_LOCALE] });
  }
}
