import { CategoriesService } from './categories.service';
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
import { UpdateCategoryDto } from './dto/update-category/update-category';
import { CreateCategoryDto } from './dto/create-category/create-category';
import { AuthenticationGuard } from 'src/common/Guards/authentication/authentication.guard';
import { AuthorizationGuard } from 'src/common/Guards/authorization/authorization.guard';
import { Roles } from 'src/common/Decorators/roles/roles.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // Public endpoints for browsing (no authentication required)
  // Get all categories
  @Get()
  findAll() {

    return this.categoriesService.findAll();
  }

  // Search categories using a query string (supports optional page/limit)
  @Get('/search')
  search(
    @Query('query') query: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.categoriesService.search(query, Number(page), Number(limit));
  }

  // Get paginated list of categories (returns items, total, page, limit)
  @Get('/paginate')
  findAllPaginated(@Query('limit') limit?: number, @Query('page') page?: number) {
    console.log('🔍 Paginate route hit with:', { limit, page });
    return this.categoriesService.findAllPaginated(Number(limit), Number(page));
  }

  // Count total number of categories
  @Get('/count')
  countCategories() {
    return this.categoriesService.countCategories();
  }

  // Find categories by name (optional)
  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.categoriesService.findByName(name);
  }

  // Get a single category by ID (must be last to avoid conflicts with specific routes)
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('🔍 ID route hit with:', { id });
    return this.categoriesService.findOne(id);
  }

  // Admin-only endpoints for management
  // Create a new category
  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('admin')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // Update a category by ID
  @Patch(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  // Soft delete a category by ID
  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
