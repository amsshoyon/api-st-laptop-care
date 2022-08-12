import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post('/signup')
    async createUser(@Body('password') password: string, @Body('username') username: string): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.usersService.createUser(username, hashedPassword);
        return result;
    }
}
