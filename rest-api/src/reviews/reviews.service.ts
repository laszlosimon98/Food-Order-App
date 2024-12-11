import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto, user: User) {
    const { user_id } = user;

    return await this.prisma.reviews.create({
      data: {
        ...createReviewDto,
        user_id,
      },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, user: User) {
    const { user_id } = user;

    const review = await this.prisma.reviews.findUnique({
      where: {
        reviews_id: id,
      },
    });

    if (user_id !== review.user_id) {
      throw new BadRequestException(
        'You do not have permission to delete change another user reviews!',
      );
    }

    return await this.prisma.reviews.update({
      where: {
        reviews_id: id,
      },
      data: updateReviewDto,
    });
  }

  async remove(id: number, user: User) {
    const { user_id, role } = user;

    const review = await this.prisma.reviews.findUnique({
      where: {
        reviews_id: id,
      },
    });

    if (role !== 'admin') {
      if (user_id !== review.user_id) {
        throw new BadRequestException(
          'You do not have permission to delete another user reviews!',
        );
      }
    }

    return await this.prisma.reviews.delete({
      where: {
        reviews_id: id,
      },
    });
  }
}
