import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpException('Authorization token is not found', 401);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

      request.user = decoded;

      return true;
    } catch (error) {
      throw new HttpException('Invalid authorization token', 401);
    }
  }
}

@Injectable()
export class AdminAuthGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpException('Authorization token is not found', 401);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

      request.user = decoded;

      const user = await prisma.user.findUnique({
        where: {
          id: String(request.user.userId),
        },
      });

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      if (user.role === 'admin') {
        return true;
      } else {
        throw new HttpException('Unauthorized', 403);
      }
    } catch (error) {
      throw new HttpException('Invalid authorization token', 401);
    }
  }
}
