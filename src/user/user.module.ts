import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserService } from './services/create-user/create-user.service';
import { UserSchema } from './schemas/user.schema';
import { CreateUserControllerController } from './controllers/create-user-controller/create-user-controller.controller';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'User',
      schema: UserSchema
    }
  ])],
  providers: [CreateUserService],
  controllers: [CreateUserControllerController]
})
export class UserModule {}
