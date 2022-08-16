import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { VariantController } from './variant.controller';
import { VariantSchema } from './variant.model';
import { VariantRepository } from './variant.repository';
import { VariantService } from './variant.service';

@Module({
  imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		MongooseModule.forFeature([{ name: 'variant', schema: VariantSchema }])
	],
  controllers: [VariantController],
  providers: [VariantService, VariantRepository]
})
export class VariantModule { }
