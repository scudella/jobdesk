import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';

export const register = async (req, res) => {
  const { name, email, password, lastName, location } = req.body;
  const isFirstAccount = (await User.countDocuments()) === 0;
  const role = isFirstAccount ? 'admin' : 'user';
  const user = await User.create({
    name,
    email,
    password,
    lastName,
    location,
    role,
  });
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  res.send('login');
};
