import { ApiProperty } from '@nestjs/swagger';
import { Reviews } from '@prisma/client';

export class ReviewEntity implements Reviews {
  @ApiProperty()
  reviews_id: number;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  food_id: number;

  @ApiProperty()
  user_id: number;

  createdAt: Date;
  updatedAt: Date;
}
