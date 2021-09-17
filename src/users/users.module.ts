import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AdminUsersModule } from '../admin-user/admin-users.module';

@Module({
  imports: [AdminUsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
