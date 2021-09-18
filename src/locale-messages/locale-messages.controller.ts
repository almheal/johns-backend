import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Post,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateLocaleMessagesDto } from './dto/create-locale-messages.dto';
import { LocaleMessagesService } from './locale-messages.service';
import { LocaleMessages } from './schemas/locale-messages.schema';
import { ObjectId } from 'mongoose';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageCode } from '../errors/error';
import { SUCCESS_MESSAGE_CODES } from '../const/success-const';

@ApiTags('LocaleMessages')
@Controller('locale-messages')
export class LocaleMessagesController {
  constructor(private localeMessagesService: LocaleMessagesService) {}

  // Create
  @ApiResponse({
    status: 201,
    type: CreateLocaleMessagesDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @Post()
  async create(@Body() dto: CreateLocaleMessagesDto): Promise<LocaleMessages> {
    return this.localeMessagesService.create(dto);
  }

  // Get all
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CreateLocaleMessagesDto,
  })
  @Get()
  async getAll(): Promise<LocaleMessages[]> {
    return this.localeMessagesService.getAll();
  }

  // Get one
  @ApiResponse({
    status: 200,
    type: CreateLocaleMessagesDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Get(':id')
  async get(@Param('id') id: string | ObjectId): Promise<LocaleMessages> {
    return this.localeMessagesService.get(id);
  }

  // Update
  @ApiResponse({
    status: 200,
    type: CreateLocaleMessagesDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body() dto: CreateLocaleMessagesDto,
    @Res() res: Response,
  ) {
    const data = await this.localeMessagesService.update(id, dto);

    res
      .status(HttpStatus.OK)
      .send({ data, message: [SUCCESS_MESSAGE_CODES.UPDATED_LOCALE_MESSAGES] });
  }

  // Delete
  @ApiResponse({
    status: 200,
    type: CreateLocaleMessagesDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorMessageCode,
  })
  @ApiParam({ name: 'id', example: '61368364fdbb50d36496ff60' })
  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId): Promise<LocaleMessages> {
    return this.localeMessagesService.delete(id);
  }
}
