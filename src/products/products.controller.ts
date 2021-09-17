import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ObjectId } from 'mongoose';
import { ErrorMessageCode } from '../errors/error';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiResponse({
    status: 201,
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.create(dto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateProductDto,
  })
  @Get()
  async getAll(@Query() query): Promise<Product[]> {
    return this.productsService.getAll(query);
  }

  @ApiResponse({
    status: 200,
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Get(':id')
  async get(@Param('id') id: string | ObjectId): Promise<Product> {
    return this.productsService.get(id);
  }

  @ApiResponse({
    status: 200,
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId): Promise<Product> {
    return this.productsService.delete(id);
  }
}
