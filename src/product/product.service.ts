import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(createProductDto);
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
