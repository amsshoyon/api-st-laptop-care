import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true, unique: true })
    handle: string;

    @Prop({ required: true })
    price: number;

    @Prop({ default: null })
    sale_price: number | null;

    @Prop({ default: [] })
    media: string[];

    @Prop({ default: 0 })
    discount: number;

    @Prop({ default: 'percentage', enum: ['percentage', 'amount'] })
    discount_type: string;

    @Prop({ default: '' })
    description: string;

    @Prop({ default: 0 })
    status: boolean;

    @Prop({ default: [] })
    tags: string[];

    @Prop({ default: '' })
    sku: string;

    @Prop({ default: 1 })
    stock: number;

    @Prop({ default: false })
    sell_when_out_of_stock: boolean;

    @Prop({ default: [] })
    options: { name: string, value: string[] }[];

    @Prop({ default: '' })
    vendor: string;

    @Prop({ default: true })
    physical_product: boolean;

    @Prop({ default: '' })
    suffix: string; // promotional text i.e. Special

    @Prop()
    category_id: Types.ObjectId;

    // TimeStamps
    @Prop({ default: now() }) createdAt: Date;
    @Prop({ default: null }) updatedAt: Date;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.virtual('variants', { ref: 'variant', localField: '_id', foreignField: 'productId' });
ProductSchema.virtual('category', { ref: 'category', localField: 'category_id', foreignField: '_id' });
ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });