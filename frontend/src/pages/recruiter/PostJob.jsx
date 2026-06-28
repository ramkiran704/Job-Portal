import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/PostJob.css";

function PostJob() {
  return (
    <>
      <RecruiterNavbar />

      <div className="post-job-page">

        <div className="post-job-card">

          <h1>Post a New Job</h1>

          <form>

            <input
              type="text"
              placeholder="Job Title"
            />

            <input
              type="text"
              placeholder="Company Name"
            />

            <input
              type="text"
              placeholder="Location"
            />

            <input
              type="text"
              placeholder="Salary"
            />

            <select>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>

            <textarea
              rows="6"
              placeholder="Job Description"
            ></textarea>

            <button>
              Post Job
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default PostJob;