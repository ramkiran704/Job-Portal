import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs'; // 👈 Added built-in File System module to check directories
import { fileURLToPath } from 'url';
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

// ✅ Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 3. Global Middleware Stack
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ FIX: Automatically create the 'uploads' folder if it doesn't exist
// This prevents Multer from crashing your server on the first file submission!
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Created missing 'uploads' directory automatically.");
}

// ✅ Use absolute path for serving uploaded resume files over http://localhost:5000/uploads/...
app.use('/uploads', express.static(uploadsDir));

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