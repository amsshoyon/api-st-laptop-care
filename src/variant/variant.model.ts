import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema({ timestamps: true })
export class Variant {
    @Prop({ required: true })
    productId: number; // relation to product model

    @Prop({ required: true })
    price: number;

    @Prop({ default: null })
    sale_price: number | null;

    @Prop({ default: '' })
    image: string;

    @Prop({ default: '' })
    sku: string;

    @Prop({ default: 1 })
    stock: number;

    @Prop({ default: false })
    sell_when_out_of_stock: boolean;

    // TimeStamps
    @Prop({ default: now() }) createdAt: Date;
    @Prop({ default: null }) updatedAt: Date;
}

export type VariantDocument = Variant & Document;
export const VariantSchema = SchemaFactory.createForClass(Variant);
