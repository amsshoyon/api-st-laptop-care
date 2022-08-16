import { Injectable } from '@nestjs/common';
import { convertToSlug } from 'src/utils/common';
import { VariantService } from 'src/variant/variant.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(
        private productRepository: ProductRepository,
        private variantService: VariantService,
    ) {}

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const { options, title } = createProductDto;
        createProductDto['handle'] = convertToSlug(title);
        const product = await this.productRepository.createProduct(createProductDto);
        if(options) this.variantService.createVariants(options, product['_id'])
        return product;
    }

    async getAllProducts(filterDto: GetProductFilterDto):  Promise<{ products: Product[]; total: number }> {
        return this.productRepository.getProducts(filterDto);
    }

    async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productRepository.updateProduct(id, updateProductDto);
    }

    async getProductByID(id: string): Promise<Product> {
        return this.productRepository.getProductByID(id);
    }
}
