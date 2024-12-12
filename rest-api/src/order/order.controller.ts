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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/roles';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(Role.User)
  @Post()
  @ApiOperation({ summary: 'Create new order, Role: User' })
  @ApiCreatedResponse({ type: OrderEntity })
  @ApiBearerAuth()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.create(createOrderDto, req.user);
  }

  @Roles(Role.Employee)
  @Get()
  @ApiOperation({ summary: 'Get all orders by id, Role: Employee' })
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  @ApiBearerAuth()
  findAll() {
    return this.orderService.findAll();
  }

  @Roles(Role.User)
  @Get('/my-orders')
  @ApiOperation({ summary: 'Get my orders by id, Role: User' })
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  @ApiBearerAuth()
  findMyOrders(@Request() req) {
    return this.orderService.findMyOrders(req.user);
  }

  @Roles(Role.User, Role.Employee)
  @Get(':id')
  @ApiOperation({ summary: 'Get order by id, Role: User, Employee' })
  @ApiOkResponse({ type: OrderEntity })
  @ApiBearerAuth()
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.orderService.findOne(id, req.user);
  }

  @Roles(Role.Employee)
  @Patch(':id')
  @ApiOperation({ summary: 'Change status to complete, Role: Employee' })
  @ApiOkResponse({ type: OrderEntity })
  @ApiBearerAuth()
  updateStatus(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.updateStatus(id);
  }

  @Roles(Role.User)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by id, Role: User' })
  @ApiOkResponse({ type: OrderEntity })
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
