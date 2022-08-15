import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { Product, ProductDocument } from './product.model';

export class ProductRepository {
    constructor(@InjectModel('product') private readonly productModel: Model<ProductDocument>) { }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.create(createProductDto);
    }

    async getProducts(filterDto: GetProductFilterDto): Promise<{ products: Product[]; count: number }> {
        const { search } = filterDto;
        const re = new RegExp(search, 'i');
        const query = await this.productModel.find()
            .or([
                { 'title': { $regex: re } },
                { 'description': { $regex: re } }
            ])
            .limit(2)
            .skip(1)
            .sort({ 'title': 'asc' })
            .exec();
        return { products: query, count: 3 }
    }
}
