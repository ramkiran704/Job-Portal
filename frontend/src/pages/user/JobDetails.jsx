import Navbar from "../../components/common/UserNavbar";
import Footer from "../../components/common/Footer";
import "../styles/JobDetails.css";

function JobDetails() {
  return (
    <>
      <UserNavbar />

      <div className="job-details">

        <div className="job-box">

          <h1>Frontend Developer</h1>

          <h3>Google</h3>

          <p><strong>Location:</strong> Bangalore</p>

          <p><strong>Salary:</strong> ₹12 LPA</p>

          <p><strong>Experience:</strong> 2+ Years</p>

          <h2>Job Description</h2>

          <p>
            We are looking for a passionate React Developer to build
            modern web applications with an amazing user experience.
          </p>

          <h2>Required Skills</h2>

          <ul>
            <li>React.js</li>
            <li>JavaScript</li>
            <li>HTML & CSS</li>
            <li>Git & GitHub</li>
            <li>REST APIs</li>
          </ul>

          <button>Apply Now</button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default JobDetails;