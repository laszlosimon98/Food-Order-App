import { ApiProperty } from '@nestjs/swagger';
import { Food } from '@prisma/client';
import { CategoryEntity } from 'src/category/entities/category.entity';

export class FoodEntity implements Food {
  @ApiProperty()
  food_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  is_spice: boolean;

  @ApiProperty()
  is_vegetarian: boolean;

  @ApiProperty({ type: CategoryEntity })
  category: CategoryEntity;

  createdAt: Date;
  updatedAt: Date;
  category_id: number;
}