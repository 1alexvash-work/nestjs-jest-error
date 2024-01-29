import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  sayHelloWorld() {
    return 'Hello World!';
  }

  login(userId: string) {
    console.log('userId:', userId);
    return 'login route';
  }

  getUsers() {
    return 'get users route';
  }

  createAccount({
    nickname,
    firstName,
    lastName,
    password,
  }: {
    nickname: string;
    firstName: string;
    lastName: string;
    password: string;
  }) {
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
