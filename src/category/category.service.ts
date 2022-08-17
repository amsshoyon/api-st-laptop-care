import { Injectable } from '@nestjs/common';
import { Category } from './category.model';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryRepository.createCategory(createCategoryDto);
    }
    
    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.getAllCategories();
    }

    async deleteCategory(id: string): Promise<void> {
        return await this.categoryRepository.deleteCategory(id);
    }

}
