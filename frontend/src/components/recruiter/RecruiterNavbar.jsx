import { Link } from "react-router-dom";
import "../../styles/RecruiterNavbar.css";

function RecruiterNavbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        Recruiter Portal
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/post-job">Post Job</Link>
        </li>

        <li>
          <Link to="/my-jobs">My Jobs</Link>
        </li>

        <li>
          <Link to="/applicants">Applicants</Link>
        </li>

        <li>
          <Link to="/">Logout</Link>
        </li>

      </ul>

    </nav>
  );
}

export default RecruiterNavbar;