import { Types } from 'mongoose';
import { CreateSubCategoryDto } from './dto/create-sub-category/create-sub-category';
import { SubCategoryService } from './sub-category.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateSubCategoryDto } from './dto/update-sub-category/update-sub-category';
import { AuthenticationGuard } from 'src/common/Guards/authentication/authentication.guard';
import { AuthorizationGuard } from 'src/common/Guards/authorization/authorization.guard';
import { Roles } from 'src/common/Decorators/roles/roles.decorator';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private subcategoriesService: SubCategoryService) {}

  // Public endpoints for browsing (no authentication required)
  // Get all subcategories, optionally filter by categoryId
  @Get()
  findAll(@Query('categoryId') categoryId?: string) {
    const categoryIdObj = categoryId
      ? new Types.ObjectId(categoryId)
      : undefined;
    return this.subcategoriesService.findAll(categoryIdObj);
  }

  // Paginate subcategories (optional category filter)
  @Get('/paginate')
  paginate(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    const categoryIdObj = categoryId ? new Types.ObjectId(categoryId) : undefined;
    return this.subcategoriesService.paginate({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      categoryId: categoryIdObj,
    });
  }

  // Search subcategories by name (en/ar), optional category filter
  @Get('/search')
  search(
    @Query('query') query: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    const categoryIdObj = categoryId ? new Types.ObjectId(categoryId) : undefined;
    return this.subcategoriesService.search({
      query,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      categoryId: categoryIdObj,
    });
  }

  // Get all subcategories under a specific category
  @Get('/category/:categoryId')
  findByCategoryId(@Param('categoryId') categoryId: string) {
    return this.subcategoriesService.findByCategoryId(
      new Types.ObjectId(categoryId),
    );
  }

  // Get a specific subcategory by ID (must be last to avoid conflicts with specific routes)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(id);
  }

  // Admin-only endpoints for management
  // Create a new subcategory
  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('admin')
  create(@Body() createSubcategoryDto: CreateSubCategoryDto) {
    return this.subcategoriesService.create(createSubcategoryDto);
  }

  // Update a subcategory by ID
  @Patch(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subcategoriesService.update(id, updateSubcategoryDto);
  }

  // Delete a subcategory by ID
  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(id);
  }
}
