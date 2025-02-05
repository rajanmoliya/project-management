import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';
import { prisma } from '../utils/prisma.js';

export const protect = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new AppError('Not authorized to access this route', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      throw new AppError('User no longer exists', 401);
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Not authorized to access this route', 401));
  }
};