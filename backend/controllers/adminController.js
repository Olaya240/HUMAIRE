import User from '../models/User.js';
import AIRequest from '../models/AIRequest.js';

// Admin-only: list all users
export const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ users });
};

// Admin-only: list all AI logs
export const getLogs = async (req, res) => {
  const logs = await AIRequest.find().populate('user', 'name email role').sort({ createdAt: -1 });
  res.json({ logs });
};
