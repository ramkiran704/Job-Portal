import Application from '../models/Application.js';

// @desc    Submit job application (File paths stored via Multer)
// @route   POST /api/applications
export const applyToJob = async (req, res, next) => {
  const { jobId } = req.body;
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a resume file');
    }

    const application = await Application.create({
      jobId,
      applicantId: req.user._id,
      resume: req.file.path 
    });

    res.status(201).json({ message: 'Application submitted successfully!', application });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications submitted by logged-in Job Seeker
// @route   GET /api/applications/my-applications
export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicantId: req.user._id })
      .populate('jobId', 'title company location');
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications received for an Employer's jobs
// @route   GET /api/applications/applicants/:jobId
export const getJobApplicants = async (req, res, next) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('applicantId', 'name email');
    res.json(applications);
  } catch (error) {
    next(error);
  }
};