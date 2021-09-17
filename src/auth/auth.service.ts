import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminUsersService } from '../admin-user/admin-users.service';
import { CreateAdminUserDto } from '../admin-user/dto/create-admin-user.dto';
import { ERRORS_MESSAGE_CODES } from '../errors/errors-const';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAdminUserDto } from '../admin-user/dto/login-admin-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private adminUserService: AdminUsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registrationAdminUser(dto: CreateAdminUserDto) {
    const candidate = await this.adminUserService.findByName(dto.name);

    if (candidate) {
      this.alreadyCreatedUserError();
    }

    const hashPassword = await bcrypt.hash(dto.password, 12);
    const user = {
      ...dto,
      password: hashPassword,
    };
    await this.adminUserService.create(user);
  }

  async loginAdminUser(dto: LoginAdminUserDto) {
    const user = await this.adminUserService.findByName(dto.name);

    if (!user) {
      this.incorrentDataError();
    }

    const passwordIsMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordIsMatch) {
      this.incorrentDataError();
    }
    const userObject = user.toObject();
    delete userObject.password;
    const token = this.generateToken({ _id: user._id, roles: user.roles });

    return {
      user: userObject,
      token,
    };
  }

  async authAdminUser(user) {
    const adminUser = await this.adminUserService.get(user._id);
    const adminUserObject = adminUser.toObject();
    delete adminUserObject.password;
    return adminUserObject;
  }

  private generateToken(data) {
    return this.jwtService.sign(data, {
      secret: this.configService.get<string>('SECRET_USER'),
    });
  }

  private alreadyCreatedUserError() {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: [ERRORS_MESSAGE_CODES.USER_ALREADY_CREATED],
        error: 'user already created',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  private incorrentDataError() {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: [ERRORS_MESSAGE_CODES.INCORRENT_DATA],
        error: 'user data incorrent',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
