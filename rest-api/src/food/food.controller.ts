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

  @ApiOperation({ summary: 'Create food, Role: Admin' })
  @ApiCreatedResponse({ type: FoodEntity })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createFoodDto: CreateFoodDto) {
    return await this.foodService.create(createFoodDto);
  }

  @ApiOperation({ summary: 'Get all foods' })
  @ApiOkResponse({ type: FoodEntity, isArray: true })
  @Public()
  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @ApiOperation({ summary: 'Get food by category' })
  @ApiOkResponse({ type: FoodEntity, isArray: true })
  @Public()
  @Get('/category/:id')
  findByCategory(@Param('id', ParseIntPipe) category_id: number) {
    return this.foodService.findByCategory(category_id);
  }

  @ApiOperation({ summary: 'Get Top 10 foods' })
  @ApiOkResponse({ type: FoodEntity, isArray: true })
  @Public()
  @Get('/topten')
  findTopTen() {
    return this.foodService.findTopTen();
  }

  @ApiOperation({ summary: 'Get food by id' })
  @ApiOkResponse({ type: FoodEntity })
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.foodService.findOne(id);
  }

  @ApiOperation({ summary: 'Update food by id, Role: Admin' })
  @ApiOkResponse({ type: FoodEntity })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodDto: UpdateFoodDto,
  ) {
    return this.foodService.update(id, updateFoodDto);
  }

  @ApiOperation({ summary: 'Delete food by id, Role: Admin' })
  @ApiOkResponse({ type: FoodEntity })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodService.remove(id);
  }
}
