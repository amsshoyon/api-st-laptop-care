import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>, private jwtService: JwtService) {}

    async getUser(query: object): Promise<User> {
        return this.userModel.findOne(query);
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.getUser({ username });
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async createUser(username: string, password: string): Promise<User> {
        return this.userModel.create({
            username,
            password
        });
    }
}
