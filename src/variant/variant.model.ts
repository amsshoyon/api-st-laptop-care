import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Variant {
    @Prop({ required: true , type: Types.ObjectId, ref: 'product',})
    productId: Types.ObjectId;

    @Prop({ default: 0 })
    price: number;

    @Prop({ default: null })
    sale_price: number | null;

    @Prop({ default: '' })
    image: string;
    
    @Prop({ default: [] })
    option: { name: string, value: string }[][];

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