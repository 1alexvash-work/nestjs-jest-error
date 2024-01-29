import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  sayHelloWorld() {
    return 'Hello World!';
  }

  login(userId: string) {
    console.log('userId:', userId);
    return 'login service';
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
    return 'create account service';
  }

  getUsers(page, usersPerPage) {
    return 'get users service';
  }

  updateProfile({
    userId,
    firstName,
    lastName,
    newPassword,
  }: {
    userId: string;
    firstName: string;
    lastName: string;
    newPassword: string;
  }) {
    return 'update profile service';
  }

  deleteAccount(userId: string) {
    return 'delete account service';
  }

  vote({ voterId, votedForId }: { voterId: string; votedForId: string }) {
    return 'vote service';
  }

  updateAvatar({ userId, file }: { userId: string; file: File }) {
    return 'update avatar service';
  }
}
