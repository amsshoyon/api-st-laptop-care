import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { CollectionSchema } from 'src/collection/collection.model';
import { VariantSchema } from 'src/variant/variant.model';
import { VariantRepository } from 'src/variant/variant.repository';
import { VariantService } from 'src/variant/variant.service';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.model';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
    imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }]),
        MongooseModule.forFeature([{ name: 'variant', schema: VariantSchema }]),
        MongooseModule.forFeature([{ name: 'collection', schema: CollectionSchema }])
	],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository, VariantService, VariantRepository]
})
export class ProductModule {}
