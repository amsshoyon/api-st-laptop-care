import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
const dotenv = require('dotenv');
dotenv.config();

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRoot(process.env.MONGO_HOST),
        AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
