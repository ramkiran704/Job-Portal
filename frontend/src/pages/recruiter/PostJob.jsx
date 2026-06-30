import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/PostJob.css";

function PostJob() {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Job vacancy successfully posted!");
        navigate("/my-jobs");
      } else {
        alert(`Failed to Post Job: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error pushing listing data onto your server cluster.");
    }
  };

  return (
    <>
      <RecruiterNavbar />
      <div className="post-job-page">
        <div className="post-job-card">
          <h1>Post a New Job</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={jobData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={jobData.company}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={jobData.location}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="salary"
              placeholder="Salary"
              value={jobData.salary}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              rows="6"
              placeholder="Job Description"
              value={jobData.description}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Post Job</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostJob;