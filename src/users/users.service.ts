import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  sayHello() {
    return 'Hello World!';
  }
}
