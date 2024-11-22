import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      omit: {
        food: {
          createdAt: true,
          updatedAt: true,
        },
        user: {
          createdAt: true,
          updatedAt: true,
        },
        category: {
          createdAt: true,
          updatedAt: true,
        },
        order: {
          createdAt: true,
          updatedAt: true,
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
