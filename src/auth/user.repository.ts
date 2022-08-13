import { ConflictException, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User, UserDocument } from './user.model';

export class UserRepository {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>, private jwtService: JwtService) { }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await this.userModel.create(user);
        } catch (error) {
            if (error.code === 11000) throw new ConflictException('User already exists');
            else throw new InternalServerErrorException();
        }
    }

    async getUser(query: object): Promise<User> {
        return this.userModel.findOne(query);
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.getUser({ username });
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!user) throw new NotAcceptableException('Could not find the user');
        if (user && passwordValid) return user;
        return null;
    }
}
