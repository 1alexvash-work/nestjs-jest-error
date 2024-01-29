import { Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { isAuthorized, isAdmin } from '../middleware';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer) {
    consumer
      .apply(isAuthorized)
      .forRoutes(
        { path: 'users/vote/:userId', method: RequestMethod.POST },
        { path: 'users/update-avatar', method: RequestMethod.POST },
      )
      .apply(isAdmin)
      .forRoutes(
        {
          path: 'users/update-profile/:userId',
          method: RequestMethod.POST,
        },
        {
          path: 'users/delete-account/:userId',
          method: RequestMethod.DELETE,
        },
      );
  }
}
