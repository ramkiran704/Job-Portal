import { Link } from "react-router-dom";
import "../../styles/UserNavbar.css";

function UserNavbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        JobPortal
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/home">Home</Link>
        </li>

        <li>
          <Link to="/jobs">Jobs</Link>
        </li>

        <li>
          <Link to="/applications">Applications</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

        <li>
          <Link to="/">Logout</Link>
        </li>

      </ul>

    </nav>
  );
}

export default UserNavbar;