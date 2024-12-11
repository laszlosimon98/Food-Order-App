import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, user: any) {
    const { foods, ...rest } = createOrderDto;
    const ids = foods.map((food) => {
      return {
        food_id: food,
      };
    });

    return await this.prisma.order.create({
      data: {
        ...rest,
        user_id: user.user_id,
        foods: {
          connect: ids,
        },
      },
      include: {
        foods: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.order.findMany({
      include: {
        foods: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findOne(id: number, user: any) {
    return await this.prisma.order.findFirst({
      where: {
        AND: [
          {
            order_id: id,
          },
          {
            user_id: user.user_id,
          },
        ],
      },
      include: {
        foods: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findMyOrders(user: any) {
    return await this.prisma.order.findMany({
      where: {
        user_id: user.user_id,
      },
      include: {
        foods: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async updateStatus(id: number) {
    return await this.prisma.order.update({
      where: {
        order_id: id,
      },
      data: {
        is_completed: true,
      },
      include: {
        foods: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.order.delete({
      where: {
        order_id: id,
      },
      include: {
        foods: {
          include: {
            category: true,
          },
        },
      },
    });
  }
}
