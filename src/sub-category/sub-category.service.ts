import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subcategory } from './schemas/subCategory.schema';
import { Model, Types } from 'mongoose';
import { CreateSubCategoryDto } from './dto/create-sub-category/create-sub-category';
import { UpdateSubCategoryDto } from './dto/update-sub-category/update-sub-category';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
  ) {}

  // Create a new subcategory
  async create(
    createSubcategoryDto: CreateSubCategoryDto,
  ): Promise<Subcategory> {
    try {
      const subcategory =
        await this.subcategoryModel.create(createSubcategoryDto);
      return subcategory;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create subcategory');
    }
  }

  // Find all subcategories, optionally filter by categoryId
  async findAll(categoryId?: Types.ObjectId): Promise<Subcategory[]> {
    try {
      const query = categoryId ? { categoryId } : {};
      console.log(query);
      return await this.subcategoryModel
        .find(query)
        .populate('categoryId')
        .exec(); // populate categoryId
    } catch (error) {
      throw new InternalServerErrorException('Failed to find subcategories');
    }
  }

  // Paginate subcategories, optionally filter by categoryId
  async paginate(params: {
    page?: number;
    limit?: number;
    categoryId?: Types.ObjectId;
  }): Promise<{ items: Subcategory[]; total: number; page: number; limit: number }>
  {
    
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(params.limit) || 10));
    const filter = params.categoryId ? { categoryId: params.categoryId } : {};
    try {
      const [items, total] = await Promise.all([
        this.subcategoryModel
          .find(filter)
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('categoryId')
          .exec(),
        this.subcategoryModel.countDocuments(filter).exec(),
      ]);
      return { items, total, page, limit };
    } catch (error) {
      throw new InternalServerErrorException('Failed to paginate subcategories');
    }
  }

  // Search subcategories by name (en/ar), optionally filter by categoryId
  async search(params: {
    query: string;
    categoryId?: Types.ObjectId;
    page?: number;
    limit?: number;
  }): Promise<{ items: Subcategory[]; total: number; page: number; limit: number }>
  {
    const { query } = params;
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(params.limit) || 10));
    const regex = new RegExp(query, 'i');
    const base = params.categoryId ? { categoryId: params.categoryId } : {};
    const filter = {
      ...base,
      $or: [{ 'name.en': regex }, { 'name.ar': regex }],
    };
    try {
      const [items, total] = await Promise.all([
        this.subcategoryModel
          .find(filter)
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('categoryId')
          .exec(),
        this.subcategoryModel.countDocuments(filter).exec(),
      ]);
      return { items, total, page, limit };
    } catch (error) {
      throw new InternalServerErrorException('Failed to search subcategories');
    }
  }

  // Find a single subcategory by ID with populated categoryId
  async findOne(id: string): Promise<Subcategory> {
    try {
      const subcategory = await this.subcategoryModel
        .findById(id)
        .populate('categoryId')
        .exec(); // populate categoryId
      if (!subcategory) {
        throw new NotFoundException(`Subcategory with ID ${id} not found`);
      }
      return subcategory;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to find subcategory with ID ${id}`,
      );
    }
  }

  // Update subcategory by ID
  async update(
    id: string,
    updateSubcategoryDto: UpdateSubCategoryDto,
  ): Promise<Subcategory> {
    try {
      const subcategory = await this.subcategoryModel
        .findByIdAndUpdate(id, updateSubcategoryDto, { new: true })
        .populate('categoryId') // populate categoryId
        .exec();
      if (!subcategory) {
        throw new NotFoundException(`Subcategory with ID ${id} not found`);
      }
      return subcategory;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update subcategory with ID ${id}`,
      );
    }
  }

  // Delete a subcategory by ID
  async remove(id: string): Promise<void> {
    try {
      const result = await this.subcategoryModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Subcategory with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to remove subcategory with ID ${id}`,
      );
    }
  }

  // Find all subcategories under a specific category, with category populated
  async findByCategoryId(categoryId: Types.ObjectId): Promise<Subcategory[]> {
    try {
      return await this.subcategoryModel
        .find({ categoryId })
        .populate('categoryId')
        .exec(); // populate categoryId
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find subcategories by category ID',
      );
    }
  }
}
