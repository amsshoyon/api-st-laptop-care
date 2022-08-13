import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.model';
import { JwtPayload } from './interface/user.interface';
const dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        console.log('username:', username);
        const user = await this.userRepository.getUser({ username });
        if (!user) throw new UnauthorizedException();
        return user;
    }
}
