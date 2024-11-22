import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { FoodEntity } from 'src/food/entities/food.entity';

export class OrderEntity implements Order {
  @ApiProperty()
  order_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty({ default: false })
  is_completed: boolean;

  @ApiProperty({ type: FoodEntity, isArray: true })
  foods: FoodEntity[];

  @ApiProperty()
  user_id: number;

  createdAt: Date;
  updatedAt: Date;
}
