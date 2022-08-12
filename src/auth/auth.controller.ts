import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('/signup')
    async createUser(@Body('password') password: string, @Body('username') username: string): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.authService.createUser(username, hashedPassword);
        return result;
    }
}
