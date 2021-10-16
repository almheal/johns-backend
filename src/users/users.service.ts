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
    const user = await createdUser.save();
    return this.removePassword(user);
  }

  async get(id: string | ObjectId): Promise<User> {
    const user = await this.userModel.findById(id);
    return this.removePassword(user);
  }

  async update(id: string | ObjectId, dto: CreateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true });
    return this.removePassword(user);
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

  private removePassword(doc) {
    const object = doc.toObject();
    delete object.password;
    return object;
  }
}
