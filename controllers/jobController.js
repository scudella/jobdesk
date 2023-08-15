import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, position, jobStatus, jobType, jobLocation } = req.body;
  const createdBy = req.user.userId;
  const job = await Job.create({
    company,
    position,
    jobStatus,
    jobType,
    jobLocation,
    createdBy,
  });
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { company, position, jobStatus, jobType, jobLocation } = req.body;

  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(
    id,
    { company, position, jobStatus, jobType, jobLocation },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const removedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob });
};
