import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoodsService } from './moods/mood.service';
import { MoodsController } from './moods/mood.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppController, MoodsController],
  providers: [AppService, MoodsService],
})
export class AppModule {}
