import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';
export type CollectionDocument = Collection & Document;

@Schema({ timestamps: true })
export class Collection {
    @Prop({ required: true })
    name: number;

    product: { type: [Types.ObjectId], ref: 'Product' }

    // TimeStamps
    @Prop({ default: now() }) createdAt: Date;
    @Prop({ default: null }) updatedAt: Date;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
