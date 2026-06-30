import Application from '../models/Application.js';
import Job from '../models/Job.js'; // ✅ ADDED: Needed to find jobs posted by this recruiter

// @desc    Submit job application (File paths stored via Multer)
// @route   POST /api/applications
export const applyToJob = async (req, res, next) => {
  const { jobId, fullName, email, phone, qualification, experience } = req.body;

  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a resume file');
    }

    const application = await Application.create({
      jobId,
      applicantId: req.user._id,
      fullName,
      email,
      phone,
      qualification,
      experience,
      resume: req.file.path,
    });

    res.status(201).json({ message: 'Application submitted successfully!', application });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications submitted by logged-in Job Seeker
// @route   GET /api/applications/my-apps
export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicantId: req.user._id })
      .populate('jobId', 'title company location');
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications received for a SINGLE specific job
// @route   GET /api/applications/job/:jobId
export const getJobApplicants = async (req, res, next) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('applicantId', 'name email');
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

// ✅ ADDED: Get ALL applications for ALL jobs posted by the logged-in Recruiter
// @route   GET /api/applications
export const getRecruiterApplicants = async (req, res, next) => {
  try {
    // 1. Find all jobs posted by this recruiter using the 'postedBy' field from your schema
    const recruiterJobs = await Job.find({ postedBy: req.user._id }).select('_id');
    
    // 2. Extract just the ID strings into an array
    const jobIds = recruiterJobs.map(job => job._id);

    // 3. Find all applications pointing to any of those Job IDs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('jobId', 'title company location')
      .populate('applicantId', 'name email');

    res.json(applications);
  } catch (error) {
    next(error);
  }
};