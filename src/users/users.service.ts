import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  sayHelloWorld() {
    return 'Hello World!';
  }

  login() {
    return 'login route';
  }

  getUsers() {
    return 'get users route';
  }

  createAccount() {
    return 'create account route';
  }

  updateProfile() {
    return 'update profile route';
  }

  deleteAccount() {
    return 'delete account route';
  }

  vote() {
    return 'vote route';
  }

  updateAvatar() {
    return 'update avatar route';
  }
}
