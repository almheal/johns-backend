import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ERRORS_MESSAGE_CODES } from '../errors/errors-const';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
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

      const user = this.jwtService.verify(token, {
        secret: this.configService.get<string>('SECRET_USER'),
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
