import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SizesService } from './sizes.service';
import { Size } from './schemas/size.schema';
import { CreateSizeDto } from './dto/create-size.dto';
import { ObjectId } from 'mongoose';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from '../tags/dto/create-tag.dto';
import { ErrorMessageCode } from '../errors/error';

@ApiTags('Sizes')
@Controller('sizes')
export class SizesController {
  constructor(private sizesService: SizesService) {}

  @ApiResponse({
    status: 201,
    type: CreateSizeDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Post()
  async create(@Body(new ValidationPipe()) dto: CreateSizeDto): Promise<Size> {
    return this.sizesService.create(dto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateSizeDto,
  })
  @Get()
  async getAll(): Promise<Size[]> {
    return this.sizesService.getAll();
  }

  @ApiResponse({
    status: 200,
    type: CreateSizeDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Get(':id')
  async get(@Param('id') id: string | ObjectId): Promise<Size> {
    return this.sizesService.get(id);
  }

  @ApiResponse({
    status: 200,
    type: CreateSizeDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreateSizeDto,
  ): Promise<Size> {
    return this.sizesService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: CreateSizeDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId): Promise<Size> {
    return this.sizesService.delete(id);
  }
}
