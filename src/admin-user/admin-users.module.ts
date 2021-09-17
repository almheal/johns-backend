import { forwardRef, Module } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUserSchema } from './schemas/admin-user.schema';
import { AdminUsersController } from './admin-users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: 'AdminUser', schema: AdminUserSchema }]),
  ],
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
  exports: [AdminUsersService],
})
export class AdminUsersModule {}
