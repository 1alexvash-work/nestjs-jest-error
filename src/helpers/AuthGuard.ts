import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

type TokenTypes = 'user' | 'admin';

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
    const bearerToken = context.switchToHttp().getRequest()
      .headers.authorization;

    if (!bearerToken) {
      throw new HttpException('Authorization token is missing', 401);
    }

    const token: TokenTypes = bearerToken.split(' ')[1];

    if (token !== 'admin') {
      throw new HttpException('You are not authorized as an admin', 401);
    }

    return true;
  }
}
