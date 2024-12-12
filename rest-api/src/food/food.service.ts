import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class FoodService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(createFoodDto: CreateFoodDto) {
    return await this.prisma.food.create({
      data: createFoodDto,
    });
  }

  async findAll() {
    return await this.prisma.food.findMany({
      orderBy: {
        food_id: 'asc',
      },
      omit: {
        category_id: true,
      },
      include: {
        category: true,
      },
    });
  }

  async findByCategory(category_id: number) {
    return await this.prisma.food.findMany({
      where: {
        category_id,
      },
      orderBy: {
        food_id: 'asc',
      },
      omit: {
        category_id: true,
      },
      include: {
        category: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.food.findUnique({
      where: {
        food_id: id,
      },
      include: {
        category: true,
        reviews: true,
      },
    });
  }

  async findTopTen() {
    return await this.prisma.food.findMany({
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
        reviews: true,
      },
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
    });
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    return await this.prisma.food.update({
      where: {
        food_id: id,
      },
      data: updateFoodDto,
    });
  }

  async remove(id: number) {
    const food = await this.prisma.food
      .delete({
        where: {
          food_id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException(`Can not find food with id ${id}`);
      });

    await this.fileUploadService.deleteImage(food.image);

    return food;
  }
}
