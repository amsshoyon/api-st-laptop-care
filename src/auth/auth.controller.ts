import { Controller, Post, UseGuards, Body, ValidationPipe, UseInterceptors, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserResponse } from './interface/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';
import { User } from './user.model';
import { GetUser } from './get-user.decorator';

@Controller('auth')
@ApiTags('Authentications')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<UserResponse> {
        return this.authService.login(authCredentialsDto);
    }

    @Post('/signup')
    async createUser(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Get('/get-user')
    @UseGuards(AuthGuard())
    getUser(@GetUser() user: User): any {
        const { username } = user;
        return { username };
    }
}
