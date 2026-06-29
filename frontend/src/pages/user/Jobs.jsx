import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/user/UserNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/Jobs.css";

function Jobs() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [jobs, setJobs] = useState([]); // Clear out static arrays
  const [loading, setLoading] = useState(true);

  // Hooking up the database fetch layer
  useEffect(() => {
    const getJobsFromDB = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        if (response.ok) {
          setJobs(data);
        }
      } catch (error) {
        console.error("Error connecting to job collections:", error);
      } finally {
        setLoading(false);
      }
    };
    getJobsFromDB();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    // Fallback logic check if you have a job type field in your schema
    const matchesFilter =
      filter === "All" || job.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <UserNavbar />
      <div className="jobs-page">
        <h1 className="available"><span>Available Jobs</span></h1>
        <p>Explore opportunities from top companies.</p>

        <div className="job-controls">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Full Time</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
        </div>

        {loading ? (
          <p style={{ textAlign: "center" }}>Querying active open positions...</p>
        ) : (
          <div className="job-grid">
            {filteredJobs.map((job) => (
              <div className="job-card" key={job._id}>
                <h2>{job.title}</h2>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                {job.type && <span className="job-type">{job.type}</span>}
                <button onClick={() => navigate(`/jobs/${job._id}`)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Jobs;