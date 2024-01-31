import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as FormData from 'form-data';
import axios from 'axios';
import { AccountDetails } from 'src/types';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  login(userId: string) {
    const token = jwt.sign({ userId }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '24h',
    });

    return token;
  }

  async createAccount(accountDetails: AccountDetails) {
    const existingUser = await prisma.user.findUnique({
      where: {
        nickname: accountDetails.nickname,
      },
    });

    if (existingUser) {
      throw new Error(
        `A user with the nickname "${accountDetails.nickname}" already exists`,
      );
    }

    const result = await prisma.user.create({
      data: accountDetails,
    });

    return result;
  }

  async getUsers(page, usersPerPage) {
    const users = await prisma.user.findMany({
      skip: usersPerPage * (Number(page) - 1),
      take: usersPerPage,
      select: {
        id: true,
        nickname: true,
        firstName: true,
        lastName: true,
      },
      where: {
        deletedAt: 'null',
      },
    });

    return users;
  }

  async updateProfile({
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
    const result = await prisma.user.update({
      where: {
        id: String(userId),
      },
      data: {
        firstName,
        lastName,
        password: newPassword,
      },
    });

    return result;
  }

  async deleteAccount(userId: string) {
    const result = await prisma.user.update({
      where: {
        id: String(userId),
      },
      data: {
        deletedAt: String(new Date()),
      },
    });

    return result;
  }

  async vote({ voterId, votedForId }: { voterId: string; votedForId: string }) {
    const userVotes = await prisma.userVotes.findUnique({
      where: {
        userId: votedForId,
      },
    });

    if (userVotes === null) {
      await prisma.userVotes.upsert({
        where: {
          userId: votedForId,
        },
        create: {
          userId: votedForId,
          votes: [voterId],
        },
        update: {
          votes: {
            push: voterId,
          },
        },
      });

      await prisma.user.update({
        where: {
          id: votedForId,
        },
        data: {
          votes: 1,
        },
      });

      return `User with id ${voterId} voted the first vote for user with id ${votedForId}`;
    }

    const updateVotes = async (votedForId, votes) => {
      await prisma.userVotes.update({
        where: {
          userId: votedForId,
        },
        data: {
          votes,
        },
      });

      await prisma.user.update({
        where: {
          id: votedForId,
        },
        data: {
          votes: votes.length,
        },
      });
    };

    if (userVotes.votes.includes(voterId)) {
      const updatedVotes = userVotes.votes.filter((vote) => vote !== voterId);

      await updateVotes(votedForId, updatedVotes);

      return `You removed vote for user with id ${votedForId}`;
    } else {
      const updatedVotes = [...userVotes.votes, voterId];

      await updateVotes(votedForId, updatedVotes);

      return `You voted for user with id ${votedForId}`;
    }
  }

  async updateAvatar({ userId, file }: { userId: string; file: any }) {
    const avatarLambdaFunction3URL =
      'https://omkogr5ya77d4o6q2otgewyrbm0agfpy.lambda-url.eu-north-1.on.aws/upload-s3-image';

    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      const { data: imageUrl } = await axios.post(
        avatarLambdaFunction3URL,
        formData,
        {
          headers: formData.getHeaders(),
        },
      );

      await prisma.user.update({
        where: {
          id: String(userId),
        },
        data: {
          avatar: String(imageUrl),
        },
      });

      return 'Avatar updated';
    } catch (error) {
      console.log('error:', error);
      throw new HttpException(
        'Something went wrong while uploading a file',
        500,
      );
    }
  }
}
