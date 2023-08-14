import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../utils/passwordUtils.js';

export const register = async (req, res) => {
  const { name, email, password, lastName, location } = req.body;

  const isFirstAccount = (await User.countDocuments()) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    lastName,
    location,
    role,
  });
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

export const login = async (req, res) => {
  res.send('login');
};
