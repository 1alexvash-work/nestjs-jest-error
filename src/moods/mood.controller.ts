import { Controller, Get } from '@nestjs/common';
import {
  AllMoods,
  allMoods,
  GoodMoods,
  goodMoods,
  BadMoods,
  badMoods,
} from './moodTypes';

const getRandomMood = (moods) => {
  return moods[Math.floor(Math.random() * moods.length)];
};

@Controller('moods')
export class MoodsController {
  @Get('/all')
  findAll(): AllMoods {
    return getRandomMood(allMoods);
  }

  @Get('/good')
  findGood(): GoodMoods {
    return getRandomMood(goodMoods);
  }

  @Get('/bad')
  findBad(): BadMoods {
    return getRandomMood(badMoods);
  }
}

// TODO: business logic
// One public route [public]
// One user route [user]
// One admin route [admin]

// TODO: implement
// Some testing
// Figure out auth guards work []
// Implement auth guard []
// Implement admin user guard []
