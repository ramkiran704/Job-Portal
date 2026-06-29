import { useState, useEffect } from "react";
import UserNavbar from "../../components/user/UserNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/JobDetails.css";
import { Link, useParams } from "react-router-dom";

function JobDetails() {
  const { id } = useParams(); // Gets the unique _id from the URL string
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`);
        const data = await response.json();
        if (response.ok) {
          setJob(data);
        }
      } catch (error) {
        console.error("Error fetching job specifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", padding: "50px" }}>Loading job details...</p>;
  if (!job) return <p style={{ textAlign: "center", padding: "50px" }}>Job not found.</p>;

  return (
    <>
      <UserNavbar />
      <div className="job-details">
        <div className="job-box">
          <h1>{job.title}</h1>
          <h3>{job.company}</h3>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          
          <h2>Job Description</h2>
          <p>{job.description || "No description provided."}</p>

          <Link to={`/apply/${job._id}`}>
            <button className="apply-btn">Apply Now</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JobDetails;