import { Injectable, NotFoundException } from '@nestjs/common';
import { FoodService } from 'src/food/food.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly foodService: FoodService) {}

  async uploadImage(id: number, filename: string) {
    const food = await this.foodService.findOne(id);

    if (!food) {
      throw new NotFoundException();
    }

    return await this.foodService.update(id, { image: filename });
  }
}
