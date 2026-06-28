import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/user/Home";
import Jobs from "./pages/user/Jobs";
import JobDetails from "./pages/user/JobDetails";
import Profile from "./pages/user/Profile";
import Applications from "./pages/user/Applications";

import Dashboard from "./pages/recruiter/Dashboard";
import PostJob from "./pages/recruiter/PostJob";
import MyJobs from "./pages/recruiter/MyJobs";
import Applicants from "./pages/recruiter/Applicants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route path="/home" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/applications" element={<Applications />} />

        {/* Recruiter */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route path="/applicants" element={<Applicants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;