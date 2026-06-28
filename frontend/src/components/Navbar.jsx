import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        JobPortal
      </div>

      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/recruiter">Dashboard</Link></li>
      </ul>

      <button className="logout-btn">
        Logout
      </button>

    </nav>
  );
}

export default Navbar;