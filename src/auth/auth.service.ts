import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminUsersService } from '../admin-user/admin-users.service';
import { CreateAdminUserDto } from '../admin-user/dto/create-admin-user.dto';
import { ERRORS_MESSAGE_CODES } from '../errors/errors-const';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAdminUserDto } from '../admin-user/dto/login-admin-user.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminUserService: AdminUsersService,
    private userService: UsersService,
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
    const secret = this.configService.get<string>('SECRET_ADMIN_USER');

    const accessToken = this.generateToken(
      { _id: user._id, roles: user.roles },
      secret,
    );

    return {
      user: userObject,
      accessToken,
    };
  }

  async authAdminUser(user) {
    const adminUser = await this.adminUserService.get(user._id);
    const adminUserObject = adminUser.toObject();
    delete adminUserObject.password;
    return adminUserObject;
  }

  async registrationUser(dto: CreateUserDto) {
    const { email, phoneNumber, password } = dto;
    const candidate = await this.userService.findByPhoneAndEmail({
      email,
      phoneNumber,
    });

    if (candidate) {
      this.alreadyCreatedUserError();
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = {
      ...dto,
      password: hashPassword,
    };
    await this.userService.create(user);
  }

  async loginUser(dto: LoginUserDto) {
    const { phoneNumber, password } = dto;
    const user = await this.userService.findByPhoneAndEmail({ phoneNumber });

    if (!user) {
      this.incorrentDataError();
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
      this.incorrentDataError();
    }

    const userObject = user.toObject();
    delete userObject.password;
    const secret = this.configService.get<string>('SECRET_USER');

    const accessToken = this.generateToken({ _id: user._id }, secret);

    return {
      user: userObject,
      accessToken,
    };
  }

  private generateToken(data: any, secret: string) {
    return this.jwtService.sign(data, { secret, expiresIn: '3h' });
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
