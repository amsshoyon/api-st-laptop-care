import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "./category.model";
import { CreateCategoryDto } from "./dto/category.dto";

export class CategoryRepository {
    constructor(@InjectModel('category') private readonly categoryModel: Model<CategoryDocument>) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryModel.create(createCategoryDto);
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }

    async deleteCategory(id: string): Promise<void> {
        await this.categoryModel.findOneAndRemove({_id: id});
    }
}
