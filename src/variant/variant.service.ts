import { Injectable } from '@nestjs/common';
import { access } from 'fs';
import { OptionInterface, VariantInterface } from './variant.interface';
import { Variant } from './variant.model';
import { VariantRepository } from './variant.repository';
@Injectable()
export class VariantService {
    constructor(private variantRepository: VariantRepository) { }


    convertOptionsToVariant(options: OptionInterface[]): VariantInterface[] {
        const optionsNames = options.reduce((acc, curr) => [...acc, curr.name], []);

        const cartesianProduct = (arr: OptionInterface[]) => {
            return arr.reduce((acc, val) => {
                return acc.map(el => val.value.map(element => el.concat([element])))
                    .reduce((acc, val) => acc.concat(val), []);
            }, [[]]);
        };

        const variationList = cartesianProduct(options);

        return variationList.reduce((acc, curr) => {
            const obj = optionsNames.reduce((a, b, i) => [...a, { name: b, value: curr[i] }], [])
            return [...acc, obj]
        }, [[]])

    }

    async createVariants(options: OptionInterface[], productId: string): Promise<any> {
        const variants = this.convertOptionsToVariant(options).reduce((acc, curr)=> {
            return [...acc, {productId: productId, option: curr}]
        }, [])

        return this.variantRepository.createVariants(variants);
    }
}
