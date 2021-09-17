import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminUser, AdminUserDocument } from './schemas/admin-user.schema';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { LoginAdminUserDto } from './dto/login-admin-user.dto';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectModel('AdminUser') private adminUserModel: Model<AdminUserDocument>,
  ) {}

  async create(dto: CreateAdminUserDto) {
    const createdAdminUser = new this.adminUserModel(dto);

    return await createdAdminUser.save();
  }

  async findByName(name) {
    const adminUser = await this.adminUserModel.findOne({ name });
    return adminUser;
  }

  async getAll() {
    try {
      return this.adminUserModel.find();
    } catch (err) {
      throw new HttpException({ statusCode: 400 }, 400);
    }
  }

  async get(id: string) {
    const adminUser = await this.adminUserModel.findById(id);
    return adminUser;
  }
}
