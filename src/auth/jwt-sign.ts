import { SetMetadata } from '@nestjs/common';

export const JWT_SIGN = 'jwtSign';

export const JWT_USERS = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const Signs = (sign: string) => SetMetadata(JWT_SIGN, sign);
