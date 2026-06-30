import Job from '../models/Job.js';

// @desc    Create a new job posting
// @route   POST /api/jobs
export const postJob = async (req, res, next) => {
  const { title, company, location, description, salary } = req.body;
  try {
    const job = await Job.create({
      title,
      company,
      location,
      description,
      salary,
      postedBy: req.user._id
    });
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all jobs (For Home.jsx / Jobs.jsx)
// @route   GET /api/jobs
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job details
// @route   GET /api/jobs/:id
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Get jobs posted by logged-in Employer
// @route   GET /api/jobs/my-jobs
export const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};