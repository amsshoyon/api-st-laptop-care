import { Variant, VariantDocument } from './variant.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class VariantRepository {
    constructor(@InjectModel('variant') private readonly variantModel: Model<VariantDocument>) { }

    async createVariants(variants: Variant[]): Promise<any> {
        return await this.variantModel.create(variants);
    }

}