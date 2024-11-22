import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
  @ApiProperty()
  category_id: number;

  @ApiProperty()
  name: string;

  createdAt: Date;
  updatedAt: Date;
}
