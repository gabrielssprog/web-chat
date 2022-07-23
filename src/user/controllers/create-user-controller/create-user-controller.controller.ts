import { Controller, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserService } from 'src/user/services/create-user/create-user.service';

@Controller('users')
export class CreateUserControllerController {
    constructor(
        public createUserService: CreateUserService
    ) {}

    @Post()
    @HttpCode(201)
    public async signup(@Req() request: Request) {
        const {
            user
        } = request.body

        const userCreated = await this.createUserService.execute(user)

        return {
            user: userCreated
        }
    }
}
