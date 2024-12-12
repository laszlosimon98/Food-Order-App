import { Injectable, NotFoundException } from '@nestjs/common';

import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadImage(id: number, filename: string) {
    const food = await this.prisma.food.findUnique({
      where: {
        food_id: id,
      },
    });

    if (!food) {
      throw new NotFoundException();
    }

    await this.deleteImage(food.image);
    return await this.prisma.food.update({
      where: {
        food_id: id,
      },
      data: {
        image: filename,
      },
    });
  }

  async deleteImage(image: string) {
    const _path = join(__dirname, '..', '..', '..', 'uploads', image);

    if (existsSync(_path)) {
      unlinkSync(_path);
    }
  }
}
