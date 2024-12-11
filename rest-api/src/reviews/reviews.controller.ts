import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ReviewEntity } from './entities/review.entity';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/roles';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'Create new reviews, Role: User' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  @Roles(Role.User)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Request() request) {
    return this.reviewsService.create(createReviewDto, request.user);
  }

  @ApiOperation({ summary: 'Update reviews by id, Role: User' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  @Roles(Role.User)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Request() request,
  ) {
    return this.reviewsService.update(id, updateReviewDto, request.user);
  }

  @ApiOperation({ summary: 'Delete reviews by id, Role: User, Employee' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  @Roles(Role.User, Role.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() request) {
    return this.reviewsService.remove(id, request.user);
  }
}
