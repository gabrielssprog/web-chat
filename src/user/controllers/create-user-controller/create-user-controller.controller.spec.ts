import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserControllerController } from './create-user-controller.controller';

describe('CreateUserControllerController', () => {
  let controller: CreateUserControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserControllerController],
    }).compile();

    controller = module.get<CreateUserControllerController>(CreateUserControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
