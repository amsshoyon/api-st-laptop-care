import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, UserInterface, UserResponse } from './interface/user.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { User } from './user.model';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

    async login(authCredentialsDto: AuthCredentialsDto): Promise<UserResponse> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.validateUser(username, password);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        const result = { accessToken, user: this.getUserData(user) };
        return { message: 'success', result };
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        await this.userRepository.signUp(authCredentialsDto);
    }

    getUserData(user: User): any {
        const userData = JSON.parse(JSON.stringify(user));
        delete userData.password;
        delete userData.salt;
        return userData;
    }
}
