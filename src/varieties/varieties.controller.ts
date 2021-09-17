import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateVarietyDto } from './dto/create-variety.dto';
import { Variety } from './schemas/variety.schema';
import { VarietiesService } from './varieties.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ObjectId } from 'mongoose';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageCode } from '../errors/error';

@ApiTags('Varieties')
@Controller('varieties')
export class VarietiesController {
  constructor(private varietiesService: VarietiesService) {}

  @ApiResponse({
    status: 201,
    type: CreateVarietyDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateVarietyDto,
  ): Promise<Variety> {
    return this.varietiesService.create(dto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateVarietyDto,
  })
  @Get()
  async getAll(): Promise<Variety[]> {
    return this.varietiesService.getAll();
  }

  @ApiResponse({
    status: 200,
    type: CreateVarietyDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Get(':id')
  async get(@Param('id') id: string | ObjectId): Promise<Variety> {
    return this.varietiesService.get(id);
  }

  @ApiResponse({
    status: 200,
    type: CreateVarietyDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreateVarietyDto,
  ): Promise<Variety> {
    return this.varietiesService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: CreateVarietyDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId): Promise<Variety> {
    return this.varietiesService.delete(id);
  }
}
