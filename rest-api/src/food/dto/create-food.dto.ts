import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  is_spice: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  is_vegetarian: boolean;

  @IsNumber()
  @ApiProperty()
  category_id: number;

  @IsBoolean()
  @ApiProperty({ default: false })
  isSpecialOffer: boolean;

  @IsNumber()
  @ApiProperty()
  specialPrice: number;
}
