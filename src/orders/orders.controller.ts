import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.schema';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.create(dto);
  }
}
