import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema({ timestamps: true })
export class Category {
    @Prop({ required: true, unique: true })
    title: string;

    // TimeStamps
    @Prop({ default: now() }) createdAt: Date;
    @Prop({ default: null }) updatedAt: Date;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
