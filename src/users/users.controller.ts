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

  @Get('page/:pageId')
  getUsers(@Param('pageId') pageId: string) {
    console.log({ pageId });

    // const usersPerPage = 10;

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
