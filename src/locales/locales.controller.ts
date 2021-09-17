import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  Put,
} from '@nestjs/common';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { LocalesService } from './locales.service';
import { Locale } from './schemas/locales.schema';
import { ObjectId } from 'mongoose';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageCode } from '../errors/error';

@ApiTags('Locales')
@Controller('locales')
export class LocalesController {
  constructor(private localesService: LocalesService) {}

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
  ): Promise<Locale> {
    return this.localesService.create(dto);
  }

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
  ): Promise<Locale> {
    return this.localesService.update(id, dto);
  }

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
  async delete(@Param('id') id: string | ObjectId): Promise<Locale> {
    return this.localesService.delete(id);
  }
}
