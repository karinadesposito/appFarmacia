import { Test, TestingModule } from '@nestjs/testing';
import { FarmaciaService } from './farmacia.service';

describe('FarmaciaService', () => {
  let service: FarmaciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmaciaService],
    }).compile();

    service = module.get<FarmaciaService>(FarmaciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
