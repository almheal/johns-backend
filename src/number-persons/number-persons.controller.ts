import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateNumberPersonsDto } from './dto/create-number-persons.dto';
import { NumberPersonsService } from './number-persons.service';
import { NumberPersons } from './schemas/number-persons.schema';
import { ObjectId } from 'mongoose';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from '../tags/dto/create-tag.dto';
import { ErrorMessageCode } from '../errors/error';

@ApiTags('NumberPersons')
@Controller('number-persons')
export class NumberPersonsController {
  constructor(private numberPersonsService: NumberPersonsService) {}

  @ApiResponse({
    status: 201,
    type: CreateNumberPersonsDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateNumberPersonsDto,
  ): Promise<NumberPersons> {
    return this.numberPersonsService.create(dto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateNumberPersonsDto,
  })
  @Get()
  async getAll(): Promise<NumberPersons[]> {
    return this.numberPersonsService.getAll();
  }

  @ApiResponse({
    status: 200,
    type: CreateNumberPersonsDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Get(':id')
  async get(@Param('id') id: string | ObjectId): Promise<NumberPersons> {
    return this.numberPersonsService.get(id);
  }

  @ApiResponse({
    status: 200,
    type: CreateNumberPersonsDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreateNumberPersonsDto,
  ): Promise<NumberPersons> {
    return this.numberPersonsService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: CreateNumberPersonsDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId): Promise<NumberPersons> {
    return this.numberPersonsService.delete(id);
  }
}
