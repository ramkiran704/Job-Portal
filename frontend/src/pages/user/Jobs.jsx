import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/user/UserNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/Jobs.css";

function Jobs() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      salary: "₹12 LPA",
      type: "Full Time",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Microsoft",
      location: "Hyderabad",
      salary: "₹15 LPA",
      type: "Remote",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Amazon",
      location: "Kochi",
      salary: "₹10 LPA",
      type: "Hybrid",
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "Adobe",
      location: "Pune",
      salary: "₹18 LPA",
      type: "Full Time",
    },
    {
      id: 5,
      title: "Data Analyst",
      company: "TCS",
      location: "Chennai",
      salary: "₹8 LPA",
      type: "Hybrid",
    },
    {
      id: 6,
      title: "Software Engineer",
      company: "Infosys",
      location: "Trivandrum",
      salary: "₹9 LPA",
      type: "Remote",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || job.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <UserNavbar />

      <div className="jobs-page">
        <h1>Available Jobs</h1>

        <p>Explore opportunities from top companies.</p>

        <div className="job-controls">

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Full Time</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>

        </div>

        <div className="job-grid">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>

              <h2>{job.title}</h2>

              <p>
                <strong>Company:</strong> {job.company}
              </p>

              <p>
                <strong>Location:</strong> {job.location}
              </p>

              <p>
                <strong>Salary:</strong> {job.salary}
              </p>

              <span className="job-type">
                {job.type}
              </span>

              <button
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                View Details
              </button>

            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Jobs;