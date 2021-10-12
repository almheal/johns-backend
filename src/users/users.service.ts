import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(dto);
    return await createdUser.save();
  }

  async get(id: string | ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  async update(id: string | ObjectId, dto: CreateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true });
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
  }

  async findByPhoneAndEmail({
    email,
    phoneNumber,
  }: {
    email?: string;
    phoneNumber?: string;
  }) {
    return this.userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });
  }
}
