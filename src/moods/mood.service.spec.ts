import { Test, TestingModule } from '@nestjs/testing';
import { MoodsService } from './mood.service';

describe('MoodService', () => {
  let service: MoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodsService],
    }).compile();

    service = module.get<MoodsService>(MoodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
