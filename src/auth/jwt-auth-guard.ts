import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ERRORS_MESSAGE_CODES } from '../errors/errors-const';
import { JWT_SIGN, JWT_USERS } from './jwt-sign';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const signUser = this.reflector.getAllAndOverride<string>(JWT_SIGN, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException(
          {
            statusCode: HttpStatus.FORBIDDEN,
            message: [ERRORS_MESSAGE_CODES.FORBIDDEN],
            error: 'not authorized',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const secretName =
        signUser === JWT_USERS.ADMIN ? 'SECRET_ADMIN_USER' : 'SECRET_USER';
      const secret = this.configService.get<string>(secretName);

      const user = this.jwtService.verify(token, {
        secret,
      });
      req.user = user;
      return true;
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: [ERRORS_MESSAGE_CODES.FORBIDDEN],
          error: 'forbidden',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
