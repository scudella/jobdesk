import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password; // the validation is not checking for password

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: process.env.CLOUDINARY_FOLDER,
    });
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const oldUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  if (req.file && oldUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(oldUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
