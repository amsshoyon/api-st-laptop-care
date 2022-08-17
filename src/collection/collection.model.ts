import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Collection {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true, unique: true })
    handle: string;

    @Prop({ default: '' })
    image: string;

    @Prop({ default: '' })
    body_html: string;

    @Prop({ default: false })
    active: boolean;

    @Prop()
    products: Types.ObjectId[];
    
    @Prop()
    tags: string[];
   
    @Prop()
    types: string[];

    // TimeStamps
    @Prop({ default: now() }) createdAt: Date;
    @Prop({ default: null }) updatedAt: Date;
}

export type CollectionDocument = Collection & Document;
export const CollectionSchema = SchemaFactory.createForClass(Collection);
CollectionSchema.virtual('product', { ref: 'product', localField: 'products', foreignField: '_id' });
CollectionSchema.set('toObject', { virtuals: true });
CollectionSchema.set('toJSON', { virtuals: true });