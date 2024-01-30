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
import { checkIfObjectIDIsValid } from 'src/helpers';
import { UserRole } from 'src/types';

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

  @Get('page/:page')
  async getUsers(@Param('page') page: string) {
    const usersPerPage = 10;

    if (isNaN(Number(page))) {
      throw new HttpException('Invalid page number', 400);
    }

    try {
      const users = await this.usersService.getUsers(page, usersPerPage);
      return users;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }

  @Post('update-profile/:userId')
  async updateProfile(
    @Param('userId')
    userId: string,
    @Body()
    {
      firstName,
      lastName,
      newPassword,
    }: { firstName: string; lastName: string; newPassword: string },
  ) {
    if (!checkIfObjectIDIsValid(userId)) {
      throw new HttpException('Invalid user ID format', 400);
    }

    const someFieldIsMissing = !firstName && !lastName && !newPassword;
    if (someFieldIsMissing) {
      throw new HttpException('No fields to update', 400);
    }

    try {
      await this.usersService.updateProfile({
        userId,
        firstName,
        lastName,
        newPassword,
      });

      return `User with id ${userId} updated`;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }

  @Delete('delete-account/:userId')
  async deleteAccount(
    @Param('userId')
    userId: string,
  ) {
    if (!checkIfObjectIDIsValid(userId)) {
      throw new HttpException('Invalid user ID format', 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: String(userId),
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if ((user.role as UserRole) !== 'admin') {
      throw new HttpException('Only admins can delete accounts', 403);
    }

    try {
      await this.usersService.deleteAccount(userId);

      return `User with id ${userId} deleted`;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }

    // return this.usersService.deleteAccount();
  }

  @Post('vote/:userId')
  async vote() {
    // TODO: figure out how to extract req.query.userId after implementing middleware
    // const voterId = req.user.userId;
    // const votedForId = req.params.userId;
    // if (!checkIfObjectIDIsValid(votedForId)) {
    //   throw new HttpException('Invalid user ID format', 400);
    // }
    // if (voterId === votedForId) {
    //   throw new HttpException('You cannot vote for yourself', 400);
    // }
    // const votedForUser = await prisma.user.findUnique({
    //   where: {
    //     id: votedForId,
    //   },
    // });
    // if (!votedForUser) {
    //   throw new HttpException('User not found', 404);
    // }
    // try {
    //   const message = await this.usersService.vote({ voterId, votedForId });
    //   return message;
    // } catch (error) {
    //   throw new HttpException('Internal server error', 500);
    // }
    // return this.usersService.vote();
  }

  @Post('update-avatar')
  async updateAvatar() {
    // TODO: figure out how to get req.file
    // const file = req.file;
    // if (!file) {
    //   throw new HttpException('No file uploaded', 400);
    // }
    // if (!file.mimetype.includes('image')) {
    //   throw new HttpException('Only images are allowed', 400);
    // }
    // try {
    //   const result = await this.usersService.updateAvatar({
    //     userId: req.user.userId,
    //     file,
    //   });
    //   return result;
    // } catch (error) {
    //   throw new HttpException('Internal server error', 500);
    // }
    // return this.usersService.updateAvatar();
  }
}
