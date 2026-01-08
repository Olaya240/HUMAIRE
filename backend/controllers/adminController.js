const User = require('../models/User');
const AIRequest = require('../models/AIRequest');

// Admin-only: list all users
exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ users });
};

// Admin-only: list all AI logs
exports.getLogs = async (req, res) => {
  const logs = await AIRequest.find().populate('user', 'name email role').sort({ createdAt: -1 });
  res.json({ logs });
};
