import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  sayHello() {
    return this.usersService.sayHelloWorld();
  }

  @Post('login')
  login() {
    return this.usersService.login();
  }

  @Get('page/:pageId')
  getUsers(@Param('pageId') pageId: string) {
    console.log({ pageId });
    return this.usersService.getUsers();
  }

  @Post('create-account')
  createAccount(
    @Body() { username, password }: { username: string; password: string },
  ) {
    console.log({ username, password });
    return this.usersService.createAccount();
  }

  @Post('update-profile/:userId')
  updateProfile() {
    return this.usersService.updateProfile();
  }

  @Delete('delete-account/:userId')
  deleteAccount() {
    return this.usersService.deleteAccount();
  }

  @Post('vote/:userId')
  vote() {
    return this.usersService.vote();
  }

  @Post('update-avatar')
  updateAvatar() {
    return this.usersService.updateAvatar();
  }
}
