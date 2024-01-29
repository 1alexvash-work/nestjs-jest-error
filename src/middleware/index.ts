import { Request, Response, NextFunction } from 'express';

export function isAuthorized(req: Request, res: Response, next: NextFunction) {
  console.log('Received request... from isAuthorized');
  next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  console.log('Received request... from isAdmin');
  next();
}
