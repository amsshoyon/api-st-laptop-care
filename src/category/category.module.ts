import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { CategoryController } from './category.controller';
import { CategorySchema } from './category.model';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'category', schema: CategorySchema }])
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository]
})
export class CategoryModule { }
