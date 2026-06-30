import { useEffect, useState } from "react";
import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/MyJobs.css";

function MyJobs() {
  // 1. Initialize state with an empty array instead of static mock listings
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch posted vacancies tied to this authenticated Recruiter account
  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5001/api/jobs/my-postings", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setJobs(data);
        } else {
          alert(`Error bringing your postings: ${data.message}`);
        }
      } catch (error) {
        console.error("Failed syncing jobs from database Cluster:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  // 3. Optional: Add a handle delete mechanism to clean up items from DB
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job vacancy listing?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Remove the deleted job instantly from state so UI updates
        setJobs(jobs.filter((job) => job._id !== id));
        alert("Job deleted successfully");
      } else {
        const errData = await response.json();
        alert(`Deletion broken: ${errData.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <RecruiterNavbar />

      <div className="myjobs-page">
        <h1>My Posted Jobs</h1>

        {loading ? (
          <p style={{ textAlign: "center", margin: "20px" }}>Loading your job vacancies...</p>
        ) : jobs.length === 0 ? (
          <p style={{ textAlign: "center", margin: "20px" }}>You haven't posted any jobs yet!</p>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              // Note that we switch 'job.id' to MongoDB's 'job._id' standard identity key property
              <div className="job-card" key={job._id}>
                <h2>{job.title}</h2>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>

                <div style={{ marginTop: "15px" }}>
                  <button onClick={() => alert("Edit window coming up next!")}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(job._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default MyJobs;