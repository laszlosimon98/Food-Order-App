import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { FoodEntity } from 'src/food/entities/food.entity';
import { isNumberObject } from 'util/types';

export class CreateOrderDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  phone_number: string;

  @IsOptional()
  @ApiProperty({ required: false, default: false })
  is_completed: boolean;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ isArray: true })
  foods: number[];
}
