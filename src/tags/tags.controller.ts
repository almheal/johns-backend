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
import { TagsService } from './tags.service';
import { Tag } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { ObjectId } from 'mongoose';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageCode } from '../errors/error';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @ApiResponse({
    status: 201,
    type: CreateTagDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Post()
  async create(@Body(new ValidationPipe()) dto: CreateTagDto): Promise<Tag> {
    return this.tagsService.create(dto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateTagDto,
  })
  @ApiQuery({ name: 'skip', example: '1', required: false })
  @ApiQuery({ name: 'limit', example: '1', required: false })
  @Get()
  async getAll(@Query() query): Promise<Tag[]> {
    return this.tagsService.getAll(query);
  }

  @ApiResponse({
    status: 200,
    type: CreateTagDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Get(':id')
  async get(@Param('id') id): Promise<Tag> {
    return this.tagsService.get(id);
  }

  @ApiResponse({
    status: 200,
    type: CreateTagDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body(new ValidationPipe()) dto: CreateTagDto,
  ): Promise<Tag> {
    return this.tagsService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: CreateTagDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId): Promise<Tag> {
    return this.tagsService.delete(id);
  }
}
