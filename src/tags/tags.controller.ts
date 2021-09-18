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
import { TagsService } from './tags.service';
import { Tag } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { ObjectId } from 'mongoose';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageCode } from '../errors/error';
import { ValidationPipe } from '../pipes/validation.pipe';
import { SUCCESS_MESSAGE_CODES } from '../const/success-const';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  // Create
  @ApiResponse({
    status: 201,
    type: CreateTagDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateTagDto,
    @Res() res: Response,
  ) {
    const data = await this.tagsService.create(dto);

    res
      .status(HttpStatus.CREATED)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.CREATED_TAG] });
  }

  // Get all
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateTagDto,
  })
  @ApiQuery({ name: 'skip', example: '1', required: false })
  @ApiQuery({ name: 'limit', example: '1', required: false })
  @Get()
  async getAll(@Query() query) {
    return this.tagsService.getAll(query);
  }

  // Get one
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

  // Update
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
    @Res() res: Response,
  ) {
    const data = await this.tagsService.update(id, dto);

    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.UPDATED_TAG] });
  }

  // Delete
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
  async delete(@Param('id') id: string | ObjectId, @Res() res: Response) {
    const data = await this.tagsService.delete(id);

    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.DELETED_TAG] });
  }
}
