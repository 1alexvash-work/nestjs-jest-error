import { Controller, Delete, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  sayHello() {
    return this.usersService.sayHelloWorld();
  }

  @Post('/login')
  login() {
    return 'login route';
  }

  @Get('/:page')
  getUsers() {
    return 'get users route';
  }

  @Post('/create-account')
  createAccount() {
    return 'create account route';
  }

  @Post('/update-profile/:userId')
  updateProfile() {
    return 'update profile route';
  }

  @Delete('/delete-account/:userId')
  deleteAccount() {
    return 'delete account route';
  }

  @Post('/vote/:userId')
  vote() {
    return 'vote route';
  }

  @Post('/update-avatar')
  updateAvatar() {
    return 'update avatar route';
  }
}
