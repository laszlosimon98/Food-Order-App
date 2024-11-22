import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/roles';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiCreatedResponse({ type: OrderEntity })
  @ApiBearerAuth()
  @Roles(Role.Employee, Role.User)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.create(createOrderDto, req.user);
  }

  @ApiCreatedResponse({ type: OrderEntity, isArray: true })
  @ApiBearerAuth()
  @Roles(Role.Employee)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiCreatedResponse({ type: OrderEntity, isArray: true })
  @ApiBearerAuth()
  @Roles(Role.User, Role.Employee)
  @Get('/my-orders')
  findMyOrders(@Request() req) {
    return this.orderService.findMyOrders(req.user);
  }

  @ApiCreatedResponse({ type: OrderEntity })
  @ApiBearerAuth()
  @Roles(Role.User, Role.Employee)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.orderService.findOne(id, req.user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
