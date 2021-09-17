import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeaturesService } from './features.service';
import { Feature } from './schemas/feature.schema';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { ObjectId } from 'mongoose';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ErrorMessageCode } from '../errors/error';

@ApiTags('Features')
@Controller('features')
export class FeaturesController {
  constructor(private featuresService: FeaturesService) {}

  @ApiResponse({
    status: 200,
    type: CreateFeatureDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateFeatureDto,
  ): Promise<Feature> {
    return this.featuresService.create(dto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateFeatureDto,
  })
  @ApiQuery({ name: 'skip', example: '1', required: false })
  @ApiQuery({ name: 'limit', example: '1', required: false })
  @Get()
  async getAll(@Query() query): Promise<Feature[]> {
    return this.featuresService.getAll(query);
  }

  @ApiResponse({
    status: 200,
    type: CreateFeatureDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Get(':id')
  async get(@Param('id') id: string | ObjectId): Promise<Feature> {
    return this.featuresService.get(id);
  }

  @ApiResponse({
    status: 200,
    type: CreateFeatureDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Put(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe()) dto: CreateFeatureDto,
  ): Promise<Feature> {
    return this.featuresService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: CreateFeatureDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Delete(':id')
  async delete(@Param('id') id): Promise<Feature> {
    return this.featuresService.delete(id);
  }
}
