import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const isAuthorized = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Authorization token not found',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error,
      message: 'Invalid authorization token',
    });
  }
};

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
  isAuthorized(req, res, () => {});

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: String(req.user.userId),
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
};
