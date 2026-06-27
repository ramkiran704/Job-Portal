import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Job Seeker', 'Recruiter', 'Admin'], required: true },
  profile: {
    bio: String,
    skills: [String],
    companyName: String, // For recruiters
    resumeUrl: String    // For job seekers
  }
}, { timestamps: true });

// Password encryption before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', userSchema);