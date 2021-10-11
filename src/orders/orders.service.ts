import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private orderModel: Model<OrderDocument>) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(dto);
    return createdOrder.save();
  }
}
