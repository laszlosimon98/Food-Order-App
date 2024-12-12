import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/decorators/public/public.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/roles';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Create category, Role: Admin' })
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiBearerAuth()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  findAll() {
    return this.categoryService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiOkResponse({ type: CategoryEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Update category by id, Role: Admin' })
  @ApiOkResponse({ type: CategoryEntity })
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete category by id, Role: Admin' })
  @ApiOkResponse({ type: CategoryEntity })
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
