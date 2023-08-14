import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';

export const register = async (req, res) => {
  const { name, email, password, lastName, location } = req.body;
  const user = await User.create({ name, email, password, lastName, location });
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  res.send('login');
};
