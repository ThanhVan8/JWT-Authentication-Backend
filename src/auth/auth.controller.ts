import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterReqDto } from './dto/register-req.dto';
import { LoginReqDto } from './dto/login-req.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginReqDto: LoginReqDto) {
    try {
      const res = await this.authService.login(loginReqDto);
      return {
        message: 'Login successfully',
        email: res.email,
        username: res.username,
        token: res.access_token,
      };
    } catch {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerReqDto: RegisterReqDto) {
    try {
      const createdUser = await this.authService.register(registerReqDto);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = createdUser;
      return {
        message: 'Register successfully',
        info: userInfo,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Register failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
