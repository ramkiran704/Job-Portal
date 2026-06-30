import express from 'express';
import {
  applyToJob,
  getMyApplications,
  getJobApplicants,
  getRecruiterApplicants // ✅ FIXED: Imported the new method
} from '../controllers/applicationController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// 1. Seeker: Apply for a job
router.post(
  '/',
  protect,
  authorizeRoles('seeker'),
  uploadResume.single('resume'),
  applyToJob
);

// 2. Recruiter: Get ALL candidate applications for jobs posted by this employer
// ✅ FIXED: Handled the GET request sent by your recruiter Applicants.jsx page
router.get(
  '/', 
  protect, 
  authorizeRoles('employer'), 
  getRecruiterApplicants
);

// 3. Seeker: Get applications submitted by the logged-in Job Seeker
router.get(
  '/my-apps', 
  protect, 
  authorizeRoles('seeker'), 
  getMyApplications
);

// 4. Recruiter: Get candidate applications for a specific single job ID
router.get(
  '/job/:jobId', 
  protect, 
  authorizeRoles('employer'), 
  getJobApplicants
);

export default router;