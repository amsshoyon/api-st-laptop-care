import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Products')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
@UseInterceptors(ResponseInterceptor)
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    createProject(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.createProduct(createProductDto);
    }

    @Get()
    getAllProducts(@Query() filterDto: GetProductFilterDto): Promise<{ products: Product[]; total: number }> {
        return this.productService.getAllProducts(filterDto);
    }
}
