import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Public Routes mapping directly to controllers
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;