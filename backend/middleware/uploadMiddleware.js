import multer from 'multer';
import path from 'path';
import fs from 'fs';

// ✅ FIX: Auto-create the uploads/ directory if it doesn't exist
// Multer does NOT create the destination folder automatically —
// if it's missing, uploads silently fail and req.file stays undefined
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('📁 Created uploads/ directory');
}

// Define Storage Rules
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // ✅ Sanitize original filename to remove spaces/special chars
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

// Filter out non-resume files
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /pdf|doc|docx/;
  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only resumes in PDF or DOC/DOCX format are allowed!'));
  }
};

export const uploadResume = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB Limit
});
