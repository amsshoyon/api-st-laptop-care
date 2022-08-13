import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './product.model';

export class ProductRepository {
    constructor(@InjectModel('product') private readonly productModel: Model<ProductDocument>) {}

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.create(createProductDto);
    }
}
