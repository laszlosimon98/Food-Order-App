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

  @Roles(Role.User)
  @Post()
  @ApiOperation({ summary: 'Create new reviews, Role: User' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  create(@Body() createReviewDto: CreateReviewDto, @Request() request) {
    return this.reviewsService.create(createReviewDto, request.user);
  }

  @Roles(Role.User)
  @Patch(':id')
  @ApiOperation({ summary: 'Update reviews by id, Role: User' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Request() request,
  ) {
    return this.reviewsService.update(id, updateReviewDto, request.user);
  }

  @Roles(Role.User, Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete reviews by id, Role: User, Employee' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  remove(@Param('id', ParseIntPipe) id: number, @Request() request) {
    return this.reviewsService.remove(id, request.user);
  }
}
