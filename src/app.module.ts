import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { MoodsController } from './moods/mood.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppController, MoodsController],
  providers: [AppService],
})
export class AppModule {}
