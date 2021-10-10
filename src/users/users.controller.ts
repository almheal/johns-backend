import {
  Controller,
  Put,
  Body,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body(new ValidationPipe()) dto: CreateUserDto, @Req() req) {
    return this.usersService.update(req.user._id, dto);
  }
}
