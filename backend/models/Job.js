import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
  },
  salary: {
    type: String, // String allows for ranges like "$80k - $100k"
    required: [true, 'Salary information is required'],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Links the job to the employer who created it
  },
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;