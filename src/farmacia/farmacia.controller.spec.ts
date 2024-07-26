import { Test, TestingModule } from '@nestjs/testing';
import { FarmaciaController } from './farmacia.controller';
import { FarmaciaService } from './farmacia.service';

describe('FarmaciaController', () => {
  let controller: FarmaciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmaciaController],
      providers: [FarmaciaService],
    }).compile();

    controller = module.get<FarmaciaController>(FarmaciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
