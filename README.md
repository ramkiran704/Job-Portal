
# Job Portal Using MERN Stack

A full-stack Job Portal web application built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The platform connects job seekers with recruiters through a secure and user-friendly recruitment system.

---

# Introduction

The Job Portal is a web-based recruitment platform that enables:

- Job Seekers to create profiles, upload resumes, search jobs, and apply for positions.
- Recruiters to post job vacancies, manage listings, and review applications.
- Administrators to manage users, recruiters, and monitor platform activities.

The application follows a RESTful architecture and implements secure authentication using JWT.

---

# Features

## Job Seeker

- User Registration & Login
- Profile Management
- Resume Upload
- Search Jobs
- Filter Jobs
- View Job Details
- Apply for Jobs
- Track Application Status

## Recruiter

- Recruiter Registration & Login
- Company Profile Management
- Create Job Posts
- Update/Delete Job Posts
- View Applicants
- Download Resumes
- Accept/Reject Applications


---

# Technology Stack

## Frontend

- React.js
- React Router
- Axios
- CSS / Bootstrap / Tailwind CSS

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Multer

## Database

- MongoDB
- Mongoose ODM

## Development Tools

- Git & GitHub
- Postman
- Nodemon
- dotenv

## Deployment

- Frontend: Vercel
- Backend: Render / Railway
- Database: MongoDB Atlas

---

# System Architecture

```
React.js Client
       │
HTTP Requests (Axios)
       │
Express.js REST API
       │
Node.js Server
       │
JWT Authentication
       │
MongoDB Database
```

---

# Project Structure

```
job-portal/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone the repository

```bash
git clone https://github.com/your-username/job-portal.git
cd job-portal
```

## Install Frontend Dependencies

```bash
cd client
npm install
```

## Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# Configuration

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:3000
```

---

# Running the Project

## Start Backend

```bash
cd backend
npm run dev
```

## Start Frontend

```bash
cd frontend
npm start
```

The application will be available at

```
Frontend:
http://localhost:5173

Backend:
http://localhost:3000
```

---

# API Overview

### Authentication

- Register User
- Login User

### Job APIs

- Create Job
- Update Job
- Delete Job
- Get All Jobs
- Search Jobs

### Application APIs

- Apply for Job
- View Applications
- Update Application Status

### Recruiter APIs

- Manage Job Listings
- View Applicants
- Download Resumes

---

# User Roles

## Job Seeker

- Register/Login
- Upload Resume
- Search Jobs
- Apply Jobs
- Track Status

## Recruiter

- Register/Login
- Manage Company Profile
- Post Jobs
- Manage Applicants

## Admin

- Manage Users
- Manage Recruiters
- Monitor Activities
- Remove Fake Jobs

---

# Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization
- Environment Variable Configuration

---

# Future Enhancements

- AI Resume Screening
- AI Job Recommendations
- Email Notifications
- Interview Scheduling
- Resume Parsing
- Company Reviews
- Chat Between Recruiter & Candidate
- Dashboard Analytics

---

# Expected Outcome

The Job Portal provides a secure, scalable, and user-friendly online recruitment platform that simplifies hiring for recruiters and job searching for candidates while demonstrating full-stack web development using the MERN stack.

---

# Contributors

Team 16 – SyntaxX

- Niya Ann Renjith
- Ram Kiran R
- Safeena K S
- Vandana K P

---

# License

This project is developed for educational purposes.

You may modify and use this project for learning and academic activities.

---

## Built With ❤️

- React.js
- Node.js
- Express.js
- MongoDB
- JWT
- Mongoose
- Axios
