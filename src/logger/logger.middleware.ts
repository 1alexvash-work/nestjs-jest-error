import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Received request...');
    next();
  }
}

// TODO:
// At src\users\users.module.ts apply middleware only for needed routes
// Add prisma
// Add new database
// Implement isAuthorized copy
// Implement isAdmin
