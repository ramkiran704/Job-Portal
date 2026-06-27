import express from 'express';
import Job from '../models/Job.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Get/Search jobs
router.get('/', async (req, res) => {
  try {
    const { keyword } = req.query;
    const query = keyword ? { title: { $regex: keyword, $options: 'i' } } : {};
    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Recruiter Only: Post a Job
router.post('/', protect, authorize('Recruiter'), async (req, res) => {
  try {
    const { title, company, location, description, requirements, salary } = req.body;
    const job = await Job.create({
      title, company, location, description, requirements, salary, recruiter: req.user._id
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;