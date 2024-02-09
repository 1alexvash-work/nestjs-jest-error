import { Test, TestingModule } from '@nestjs/testing';
import { MoodsController } from './mood.controller';
import { allMoods, goodMoods, badMoods } from './moodTypes';

describe('MoodController', () => {
  let controller: MoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodsController],
    }).compile();

    controller = module.get<MoodsController>(MoodsController);
  });

  it('Should return a random mood', () => {
    const randomMood = controller.findAllMoods();
    expect(allMoods).toContain(randomMood);
  });

  it('Should return a bad mood', () => {
    const randomBadMood = controller.findBadMoods();
    expect(badMoods).toContain(randomBadMood);
  });

  it('Should return a good mood', () => {
    const randomGoodMood = controller.findGoodMoods();
    expect(goodMoods).toContain(randomGoodMood);
  });
});
