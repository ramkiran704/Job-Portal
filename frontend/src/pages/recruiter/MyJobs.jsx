import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/MyJobs.css";

function MyJobs() {

  const jobs = [
    {
      id:1,
      title:"Frontend Developer",
      applicants:20
    },
    {
      id:2,
      title:"Backend Developer",
      applicants:12
    },
    {
      id:3,
      title:"UI Designer",
      applicants:8
    }
  ];

  return (
    <>
      <RecruiterNavbar />

      <div className="myjobs-page">

        <h1>My Posted Jobs</h1>

        <div className="jobs-grid">

          {jobs.map(job => (

            <div className="job-card" key={job.id}>

              <h2>{job.title}</h2>

              <p>{job.applicants} Applicants</p>

              <button>Edit</button>

              <button className="delete">
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default MyJobs;