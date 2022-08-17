import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
@UseInterceptors(ResponseInterceptor)
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Post()
    createProject(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Get()
    getAllCollections(): Promise<Category[]> {
        return this.categoryService.getAllCategories();
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.categoryService.deleteCategory(id);
    }
}
