import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import Route Handlers
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

// 1. Initialize Configuration Environment
dotenv.config();

// 2. Establish Database Connection 
connectDB();

const app = express();

// 3. Global Middleware Stack
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Serve static directory for resume files uploaded via Multer
app.use('/uploads', express.static('uploads'));

// 4. API Endpoints Mapping
app.use('/api/auth', authRoutes);               
app.use('/api/jobs', jobRoutes);                 
app.use('/api/applications', applicationRoutes); 

// 5. Root Status Healthcheck
app.get('/', (req, res) => {
  res.send('SyntaxX Job Portal API is operational.');
});

// 6. Centralized Error Handling Interceptor
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// 7. Initialize Application Port Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server processing on port ${PORT}`);
});