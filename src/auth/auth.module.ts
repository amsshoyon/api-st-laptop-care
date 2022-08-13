import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from 'src/auth/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
const dotenv = require('dotenv');
dotenv.config();

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: 3600 * 24
            }
        }),
        MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])
    ],
    providers: [AuthService, JwtStrategy, UserRepository],
    controllers: [AuthController]
})
export class AuthModule {}
