import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { Product, ProductDocument } from './product.model';

export class ProductRepository {
    constructor(
        @InjectModel('product') private readonly productModel: Model<ProductDocument>
    ) { }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.create({
            title: createProductDto.title,
            price: createProductDto.price,
            discount: createProductDto.discount,
            discountType: createProductDto.discountType,
            image: createProductDto.image,
            description: createProductDto.description
        });
    }

    async getProducts(filterDto: GetProductFilterDto): Promise<{ products: Product[]; count: number }> {
        const { search, page, limit, sortby } = filterDto;
        const [sortName, sortType]: any = sortby.split('_');
        const re = new RegExp(search, 'i');

        let options = {};
        if (filterDto.search) {
            options = {
                $or: [
                    { 'title': { $regex: re } },
                    { 'description': { $regex: re } }
                ]
            }
        }

        const query = this.productModel.find(options);
        query.sort({ [sortName]: sortType ? sortType : 'asc' })
        const total = await this.productModel.count(options);

        const products = await query.limit(limit).skip((page - 1) * limit).exec();
        return { products, count: total }
    }
}
