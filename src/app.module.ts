import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();
const user = encodeURIComponent(process.env.MONGO_ATLAS_USER);
const password = encodeURIComponent(process.env.MONGO_ATLAS_PASSWORD);

@Module({
    imports: [MongooseModule.forRoot(`mongodb+srv://${user}:${password}@testcluster.hz8t296.mongodb.net/?retryWrites=true&w=majority`), AuthModule],
    controllers: [],
    providers: []
})
export class AppModule {}
