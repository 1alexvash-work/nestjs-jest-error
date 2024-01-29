import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(
    @Body() { nickname, password }: { nickname: string; password: string },
  ) {
    if (!nickname || !password) {
      throw new HttpException('Missing credentials', 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        nickname,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (user.password !== password) {
      throw new HttpException('Wrong password', 401);
    }

    const token = await this.usersService.login(user.id);

    return token;
  }

  @Post('create-account')
  async createAccount(
    @Body()
    {
      nickname,
      firstName,
      lastName,
      password,
    }: {
      nickname: string;
      firstName: string;
      lastName: string;
      password: string;
    },
  ) {
    const someFieldIsMissing =
      !nickname || !firstName || !lastName || !password;

    if (someFieldIsMissing) {
      const missingFields: string[] = [];

      if (!nickname) missingFields.push('nickname');
      if (!firstName) missingFields.push('firstName');
      if (!lastName) missingFields.push('lastName');
      if (!password) missingFields.push('password');

      throw new HttpException(
        `Missing required fields: ${missingFields.join(', ')}`,
        400,
      );
    }

    try {
      const result = await this.usersService.createAccount({
        nickname,
        firstName,
        lastName,
        password,
      });

      return result;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }

  @Get('page/:pageId')
  getUsers(@Param('pageId') pageId: string) {
    console.log({ pageId });

    // const usersPerPage = 10;

    return this.usersService.getUsers();
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
