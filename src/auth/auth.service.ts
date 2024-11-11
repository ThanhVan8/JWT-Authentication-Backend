import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.model';
import * as bcrypt from 'bcrypt';
import { RegisterReqDto } from './dto/register-req.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginReqDto } from './dto/login-req.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    loginReq: LoginReqDto,
  ): Promise<{ email: string; username: string; access_token: string }> {
    const user = await this.userService.findByEmail(loginReq.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(loginReq.password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { id: user._id, email: user.email };
    return {
      email: user.email,
      username: user.username,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(authReq: RegisterReqDto): Promise<User> {
    const foundUser = await this.userService.findByEmail(authReq.email);
    if (foundUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(authReq.password, 10);
    authReq.password = hashedPassword;

    const newUser = this.userService.createUser(authReq);
    return newUser;
  }
}
