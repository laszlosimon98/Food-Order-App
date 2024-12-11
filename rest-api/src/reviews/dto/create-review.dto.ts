import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({ default: 1 })
  rating: number;

  @IsString()
  @ApiProperty()
  message: string;

  @IsNumber()
  @ApiProperty()
  food_id: number;

  createdAt: Date;
  updatedAt: Date;
}
