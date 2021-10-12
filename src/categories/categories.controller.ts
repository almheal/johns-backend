import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ErrorMessageCode } from '../errors/error';
import { ObjectId } from 'mongoose';
import { SUCCESS_MESSAGE_CODES } from '../const/success-const';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // Create
  @ApiResponse({
    status: 201,
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    const data = await this.categoriesService.create(dto);
    res
      .status(HttpStatus.CREATED)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.CREATED_CATEGORY] });
  }

  // GetAll
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateCategoryDto,
  })
  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoriesService.getAll();
  }

  // Get one
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

  // Update
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @ApiResponse({
    status: 200,
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    const data = await this.categoriesService.update(id, dto);

    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.UPDATED_CATEGORY] });
  }

  // Delete
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @ApiResponse({
    status: 200,
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Roles('admin', 'employee')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId, @Res() res: Response) {
    const data = await this.categoriesService.delete(id);
    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.UPDATED_CATEGORY] });
  }
}
