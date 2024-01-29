import { Controller, Delete, Get, Post } from '@nestjs/common';
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

  @Get(':page')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post('create-account')
  createAccount() {
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
