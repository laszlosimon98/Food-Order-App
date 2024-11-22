import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}

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
    return await this.prisma.food.delete({
      where: {
        food_id: id,
      },
    });
  }
}
