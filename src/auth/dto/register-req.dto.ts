import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterReqDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  username: string;
}
