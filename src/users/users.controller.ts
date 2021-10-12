import { Controller, Put, Get, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Signs } from '../auth/jwt-sign';
import { JWT_USERS } from '../auth/jwt-sign';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Signs(JWT_USERS.USER)
  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Req() req) {
    return this.usersService.get(req.user._id);
  }

  @Signs(JWT_USERS.USER)
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body(new ValidationPipe()) dto: CreateUserDto, @Req() req) {
    return this.usersService.update(req.user._id, dto);
  }
}
