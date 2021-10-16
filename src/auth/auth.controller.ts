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
import { SUCCESS_MESSAGE_CODES } from '../const/success-const';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JWT_USERS, Signs } from './jwt-sign';
import { CheckRegisterUserDto } from '../users/dto/check-register-user.dto';
import { CreateUserWithPasswordDto } from '../users/dto/user-password.dto';

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
    res
      .status(HttpStatus.CREATED)
      .send({ message: [SUCCESS_MESSAGE_CODES.REGISTER_USER] });
  }

  @Post('admin/login')
  async loginAdminUser(
    @Body(new ValidationPipe()) dto: LoginAdminUserDto,
    @Res() res: Response,
  ) {
    const data = await this.authService.loginAdminUser(dto);
    res
      .status(HttpStatus.OK)
      .send({ ...data, message: [SUCCESS_MESSAGE_CODES.LOGIN_ADMIN_USER] });
  }

  @Signs(JWT_USERS.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async authAdminUser(@Req() req) {
    return this.authService.authAdminUser(req.user);
  }

  @Post('register')
  async registrationUser(
    @Body(new ValidationPipe()) dto: CreateUserWithPasswordDto,
    @Res() res: Response,
  ) {
    await this.authService.registrationUser(dto);
    res
      .status(HttpStatus.CREATED)
      .send({ message: [SUCCESS_MESSAGE_CODES.REGISTER_USER] });
  }

  @Post('login')
  async loginUser(@Body(new ValidationPipe()) dto: LoginUserDto) {
    return this.authService.loginUser(dto);
  }

  @Post('check')
  async checkAlreadyUser(
    @Body(new ValidationPipe()) dto: CheckRegisterUserDto,
  ) {
    return this.authService.checkRegisterUser(dto);
  }
}
