import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class CreateUserService {
    constructor(
        @InjectModel('User')
        private userModel: Model<UserDocument>
    ) { }

    async execute(createUserDto: CreateUserDto) {
        const createdUser = new this.userModel(createUserDto)
        
        return await createdUser.save()
    }
}
