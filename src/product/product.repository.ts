import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './product.model';

export class ProductRepository {
    constructor(@InjectModel('product') private readonly productModel: Model<ProductDocument>) { }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.create(createProductDto);
    }

    async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        return await this.productModel.findByIdAndUpdate({ _id: id }, updateProductDto, { new: true });
    }

    async getProductByID(id: string): Promise<Product> {
        return await this.productModel.findById(id).populate({path: 'variants'}).exec();
    }

    async getProducts(filterDto: GetProductFilterDto): Promise<{ products: Product[]; total: number }> {
        const { search, page, limit, sortby, price } = filterDto;
        const [sortName, sortType]: any = sortby.split('_');
        const re = new RegExp(search, 'i');

        let options = {};
        if (search) {
            options = {
                $or: [
                    { 'title': { $regex: re } },
                    { 'description': { $regex: re } }
                ]
            }
        }

        if (price) {
            const [min, max] = price;
            options['price'] = { $lte: max ? max : min, $gte: max ? min : 0 }
        }

        const query = this.productModel.find(options);
        query.sort({ [sortName]: sortType ? sortType : 'asc' })
        const total = await this.productModel.count(options);
        const products = await query.limit(limit).skip((page - 1) * limit).exec();
        return { products, total: total }
    }
}
