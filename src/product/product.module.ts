import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.model';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
    imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }])
	],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository]
})
export class ProductModule {}
