import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    price: number;

    @Prop({ default: '' })
    image: string;

    @Prop({ default: 0 })
    discount: number;

    @Prop({ default: 'percentage', enum: ['percentage', 'amount'] })
    discountType: string;

    @Prop({ default: '' })
    description: string;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
