import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { RegisterReqDto } from 'src/auth/dto/register-req.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email });
  }

  async createUser(registerReqDto: RegisterReqDto): Promise<User> {
    const newUser = await new this.userModel(registerReqDto).save();
    return newUser.toObject();
  }
}
