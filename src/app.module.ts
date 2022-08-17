import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { VariantModule } from './variant/variant.module';
import { CollectionModule } from './collection/collection.module';
import { CategoryModule } from './category/category.module';
require('dotenv').config();

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRoot(process.env.MONGO_HOST),
        AuthModule,
        ProductModule,
        VariantModule,
        CollectionModule,
        CategoryModule
    ],
    providers: []
})
export class AppModule {}
