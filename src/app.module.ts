import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoodService } from './mood/mood.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, MoodService],
})
export class AppModule {}
