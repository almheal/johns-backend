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
import { IngredientsService } from './ingredients.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ingredient } from './schemas/ingredient.schema';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { ObjectId } from 'mongoose';
import { ErrorMessageCode } from '../errors/error';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

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
  ): Promise<Ingredient> {
    return this.ingredientsService.create(dto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateIngredientDto,
  })
  @Get()
  async getAll(@Query() query): Promise<Ingredient[]> {
    return this.ingredientsService.getAll(query);
  }

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
  ): Promise<Ingredient> {
    return this.ingredientsService.update(id, dto);
  }

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
  async delete(@Param('id') id: string | ObjectId): Promise<Ingredient> {
    return this.ingredientsService.delete(id);
  }
}
