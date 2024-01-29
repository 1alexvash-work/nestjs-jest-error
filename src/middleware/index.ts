import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class isAuthorized implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Received request... from isAuthorized');
    next();
  }
}

@Injectable()
export class isAdmin implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Received request... from isAdmin');
    next();
  }
}
