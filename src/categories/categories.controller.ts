import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ErrorMessageCode } from '../errors/error';
import { ObjectId } from 'mongoose';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiResponse({
    status: 201,
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.create(dto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateCategoryDto,
  })
  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoriesService.getAll();
  }

  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @ApiResponse({
    status: 200,
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Get(':id')
  async get(@Param('id') id: string | ObjectId): Promise<Category> {
    return this.categoriesService.get(id);
  }

  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @ApiResponse({
    status: 200,
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, dto);
  }

  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @ApiResponse({
    status: 200,
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId): Promise<Category> {
    return this.categoriesService.delete(id);
  }
}
