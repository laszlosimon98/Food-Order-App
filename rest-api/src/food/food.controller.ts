import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/roles';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { FoodEntity } from './entities/food.entity';
import { Public } from 'src/decorators/public/public.decorator';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ApiCreatedResponse({ type: FoodEntity })
  @ApiBearerAuth()
  @Roles(Role.Employee)
  @Post()
  async create(@Body() createFoodDto: CreateFoodDto) {
    return await this.foodService.create(createFoodDto);
  }

  @ApiOkResponse({ type: FoodEntity, isArray: true })
  @Public()
  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @ApiOkResponse({ type: FoodEntity, isArray: true })
  @Public()
  @Get('/category/:id')
  findByCategory(@Param('id', ParseIntPipe) category_id: number) {
    return this.foodService.findByCategory(category_id);
  }

  @ApiOkResponse({ type: FoodEntity, isArray: true })
  @Public()
  @Get('/topten')
  findTopTen() {
    return this.foodService.findTopTen();
  }

  @ApiOkResponse({ type: FoodEntity })
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.foodService.findOne(id);
  }

  @ApiOkResponse({ type: FoodEntity })
  @ApiBearerAuth()
  @Roles(Role.Employee)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodDto: UpdateFoodDto,
  ) {
    return this.foodService.update(id, updateFoodDto);
  }

  @ApiOkResponse({ type: FoodEntity })
  @ApiBearerAuth()
  @Roles(Role.Employee)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodService.remove(id);
  }
}
