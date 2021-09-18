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
import { IngredientsService } from './ingredients.service';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ingredient } from './schemas/ingredient.schema';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { ObjectId } from 'mongoose';
import { ErrorMessageCode } from '../errors/error';
import { ValidationPipe } from '../pipes/validation.pipe';
import { SUCCESS_MESSAGE_CODES } from '../const/success-const';

@ApiTags('Ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  // Create
  @ApiResponse({
    status: 200,
    type: CreateIngredientDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateIngredientDto,
    @Res() res: Response,
  ) {
    const data = await this.ingredientsService.create(dto);
    res
      .status(HttpStatus.CREATED)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.CREATED_INGREDIENT] });
  }

  // Get all
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateIngredientDto,
  })
  @ApiQuery({ name: 'skip', example: '1', required: false })
  @ApiQuery({ name: 'limit', example: '1', required: false })
  @Get()
  async getAll(@Query() query): Promise<Ingredient[]> {
    return this.ingredientsService.getAll(query);
  }

  // Get one
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @ApiResponse({
    status: 200,
    type: CreateIngredientDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Get(':id')
  async get(@Param('id') id: string | ObjectId): Promise<Ingredient> {
    return this.ingredientsService.get(id);
  }

  // Update
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @ApiResponse({
    status: 200,
    type: CreateIngredientDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreateIngredientDto,
    @Res() res: Response,
  ) {
    const data = await this.ingredientsService.update(id, dto);
    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.UPDATED_INGREDIENT] });
  }

  // Delete
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @ApiResponse({
    status: 200,
    type: CreateIngredientDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId, @Res() res: Response) {
    const data = await this.ingredientsService.delete(id);
    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.DELETED_INGREDIENT] });
  }
}
