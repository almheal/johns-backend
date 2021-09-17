import {
  Body,
  Controller,
  Get,
  Req,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateAdminUserDto } from '../admin-user/dto/create-admin-user.dto';
import { Response } from 'express';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AuthService } from './auth.service';
import { LoginAdminUserDto } from '../admin-user/dto/login-admin-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth-guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('admin/register')
  async registrationAdminUser(
    @Body(new ValidationPipe()) dto: CreateAdminUserDto,
    @Res() res: Response,
  ) {
    await this.authService.registrationAdminUser(dto);
    res.status(HttpStatus.CREATED).send();
  }

  @Post('admin/login')
  async loginAdminUser(
    @Body(new ValidationPipe()) dto: LoginAdminUserDto,
    @Res() res: Response,
  ) {
    const data = await this.authService.loginAdminUser(dto);
    res.status(HttpStatus.OK).send(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async authAdminUser(@Req() req) {
    return this.authService.authAdminUser(req.user);
  }
}
