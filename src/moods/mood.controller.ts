import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  AllMoods,
  allMoods,
  GoodMoods,
  goodMoods,
  BadMoods,
  badMoods,
} from './moodTypes';
import { AdminAuthGuard, AuthGuard } from 'src/helpers/AuthGuard';

const getRandomMood = (moods) => {
  return moods[Math.floor(Math.random() * moods.length)];
};

@Controller('moods')
export class MoodsController {
  @Get('/all')
  findAllMoods(): AllMoods {
    return getRandomMood(allMoods);
  }

  @UseGuards(AuthGuard)
  @Get('/good')
  findGoodMoods(): GoodMoods {
    return getRandomMood(goodMoods);
  }

  @UseGuards(AdminAuthGuard)
  @Get('/bad')
  findBadMoods(): BadMoods {
    return getRandomMood(badMoods);
  }
}
