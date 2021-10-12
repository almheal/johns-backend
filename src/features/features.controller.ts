import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Query,
  Param,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeaturesService } from './features.service';
import { Feature } from './schemas/feature.schema';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { ObjectId } from 'mongoose';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ErrorMessageCode } from '../errors/error';
import { SUCCESS_MESSAGE_CODES } from '../const/success-const';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';

@ApiTags('Features')
@Controller('features')
export class FeaturesController {
  constructor(private featuresService: FeaturesService) {}

  // Create
  @ApiResponse({
    status: 200,
    type: CreateFeatureDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateFeatureDto,
    @Res() res: Response,
  ) {
    const data = await this.featuresService.create(dto);
    res
      .status(HttpStatus.CREATED)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.CREATED_FEATURE] });
  }

  // Get all
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateFeatureDto,
  })
  @ApiQuery({ name: 'skip', example: '1', required: false })
  @ApiQuery({ name: 'limit', example: '1', required: false })
  @Get()
  async getAll(@Query() query) {
    return this.featuresService.getAll(query);
  }

  // Get one
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

  // Update
  @ApiResponse({
    status: 200,
    type: CreateFeatureDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe()) dto: CreateFeatureDto,
    @Res() res: Response,
  ) {
    const data = await this.featuresService.update(id, dto);
    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.UPDATED_FEATURE] });
  }

  // Delete
  @ApiResponse({
    status: 200,
    type: CreateFeatureDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id, @Res() res: Response) {
    const data = await this.featuresService.delete(id);
    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.DELETED_FEATURE] });
  }
}
