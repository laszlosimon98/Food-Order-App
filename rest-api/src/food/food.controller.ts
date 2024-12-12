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
  ApiOperation,
} from '@nestjs/swagger';
import { FoodEntity } from './entities/food.entity';
import { Public } from 'src/decorators/public/public.decorator';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create food, Role: Admin' })
  @ApiCreatedResponse({ type: FoodEntity })
  @ApiBearerAuth()
  async create(@Body() createFoodDto: CreateFoodDto) {
    return await this.foodService.create(createFoodDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all foods' })
  @ApiOkResponse({ type: FoodEntity, isArray: true })
  findAll() {
    return this.foodService.findAll();
  }

  @Public()
  @Get('/category/:id')
  @ApiOperation({ summary: 'Get food by category' })
  @ApiOkResponse({ type: FoodEntity, isArray: true })
  findByCategory(@Param('id', ParseIntPipe) category_id: number) {
    return this.foodService.findByCategory(category_id);
  }

  @Public()
  @Get('/topten')
  @ApiOperation({ summary: 'Get Top 10 foods' })
  @ApiOkResponse({ type: FoodEntity, isArray: true })
  findTopTen() {
    return this.foodService.findTopTen();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get food by id' })
  @ApiOkResponse({ type: FoodEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.foodService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Update food by id, Role: Admin' })
  @ApiOkResponse({ type: FoodEntity })
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodDto: UpdateFoodDto,
  ) {
    return this.foodService.update(id, updateFoodDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete food by id, Role: Admin' })
  @ApiOkResponse({ type: FoodEntity })
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodService.remove(id);
  }
}
