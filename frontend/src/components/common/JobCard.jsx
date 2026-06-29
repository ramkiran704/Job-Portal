import { Link } from "react-router-dom";
import "../../styles/JobCard.css";

function JobCard({ job }) {
  const handleApply = () => {
    alert(`Successfully applied for ${job.title} at ${job.company}`);
  };

  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <h3>{job.company}</h3>
      <p>📍 {job.location}</p>
      <p>💰 {job.salary}</p>

      <span className="job-type">{job.type}</span>

      <div className="job-buttons">
        <button className="apply-btn" onClick={handleApply}>
          Apply Now
        </button>

        <Link to={`/jobs/${job.id}`}>
          <button className="details-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}

export default JobCard;