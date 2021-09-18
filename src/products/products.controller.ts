import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ObjectId } from 'mongoose';
import { ErrorMessageCode } from '../errors/error';
import { SUCCESS_MESSAGE_CODES } from '../const/success-const';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // Create
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
    @Res() res: Response,
  ) {
    const data = await this.productsService.create(dto);

    res
      .status(HttpStatus.CREATED)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.CREATED_PRODUCT] });
  }

  // Get all
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateProductDto,
  })
  @ApiQuery({ name: 'skip', example: '1', required: false })
  @ApiQuery({ name: 'limit', example: '1', required: false })
  @Get()
  async getAll(@Query() query) {
    return this.productsService.getAll(query);
  }

  // Get one
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

  // Update
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
    @Res() res: Response,
  ) {
    const data = await this.productsService.update(id, dto);

    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.UPDATED_PRODUCT] });
  }

  // Delete
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
  async delete(@Param('id') id: string | ObjectId, @Res() res: Response) {
    const data = await this.productsService.delete(id);

    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.DELETED_PRODUCT] });
  }
}
