import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginReqDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
