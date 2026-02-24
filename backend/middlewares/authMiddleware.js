import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to protect routes; expects Authorization: Bearer <token>
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    // Attach user info to request
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Admin-only guard
export const adminOnly = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  const user = await User.findById(req.user.id);
  if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};
