import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    price: number;

    @Prop({default: ''})
    image: string;

    @Prop({default: 0})
    discount: number;
    
    @Prop({default: 'percentage'})
    discountType: 'percentage' | 'amount';

    @Prop({default: ''})
    description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
