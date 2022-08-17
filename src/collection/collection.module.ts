import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ProductSchema } from 'src/product/product.model';
import { CollectionController } from './collection.controller';
import { CollectionSchema } from './collection.model';
import { CollectionRepository } from './collection.repository';
import { CollectionService } from './collection.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'collection', schema: CollectionSchema }]),
    MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }]),
  ],
  controllers: [CollectionController],
  providers: [CollectionService, CollectionRepository]
})
export class CollectionModule { }
