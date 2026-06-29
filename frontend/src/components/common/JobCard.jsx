import { Link } from "react-router-dom";
import "../../styles/JobCard.css";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <h3>{job.company}</h3>

      <p>📍 {job.location}</p>
      <p>💰 {job.salary}</p>

      {job.type && <span className="job-type">{job.type}</span>}

      <div className="job-buttons">
        {/* ✅ FIXED: Changed job.id to job._id */}
        <Link to={`/apply/${job._id}`}>
          <button className="apply-btn">Apply Now</button>
        </Link>

        {/* ✅ FIXED: Changed job.id to job._id */}
        <Link to={`/jobs/${job._id}`}>
          <button className="details-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}

export default JobCard;