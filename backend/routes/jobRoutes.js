import express from 'express';
import {
  postJob,
  getAllJobs,
  getJobById,
  getMyJobs
} from '../controllers/jobController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

/* --- PUBLIC ROUTES --- */
router.get('/', getAllJobs);

// ✅ FIX: /my-postings MUST come before /:id
// Express matches routes top-to-bottom — if /:id is first,
// a request to /my-postings gets treated as id="my-postings"
// and hits the DB with a bad ObjectId, never reaching getMyJobs
router.get('/my-postings', protect, authorizeRoles('employer'), getMyJobs);

router.get('/:id', getJobById);

/* --- RECRUITER RESTRICTED ROUTES --- */
router.post('/', protect, authorizeRoles('employer'), postJob);

export default router;
