import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';

type TokenTypes = 'user' | 'admin';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const bearerToken = context.switchToHttp().getRequest()
      .headers.authorization;

    if (!bearerToken) {
      throw new HttpException('Authorization token is missing', 401);
    }

    const token: TokenTypes = bearerToken.split(' ')[1];

    if (token !== 'user' && token !== 'admin') {
      throw new HttpException('Authorization token is missing', 401);
    }

    return true;
  }
}

@Injectable()
export class AdminAuthGuard extends AuthGuard {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
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
