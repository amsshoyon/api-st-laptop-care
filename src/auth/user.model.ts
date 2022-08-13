import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: false, unique: true })
    email: string;

    @Prop({ required: false })
    fullname: string;

    @Prop({ required: false })
    phone: string;

    @Prop({ required: false })
    address: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
