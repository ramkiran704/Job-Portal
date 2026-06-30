import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/ApplyForm.css";

function ApplyForm() {
  const { id } = useParams(); // Retrieves Job ObjectId directly from URL parameter
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    resume: null, // Stores raw binary file payload instead of standard string text
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      alert("Please upload a resume file");
      return;
    }

    // Wrap form content using FormData format to support handling files through Multer
    const data = new FormData();
    data.append("jobId", id);
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("qualification", formData.qualification);
    data.append("experience", formData.experience);
    data.append("resume", formData.resume);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
          // CRITICAL: Do NOT set Content-Type header manually here
        },
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Application submitted successfully!");
        navigate("/applications");
      } else {
        alert(`Application Error: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading application files.");
    }
  };

  return (
    <div className="apply-page">
      <div className="apply-form-container">
        <h1>Apply for Job</h1>

        <form onSubmit={handleSubmit} className="apply-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
          />

          <div style={{ textAlign: "left", margin: "10px 0" }}>
            <label style={{ fontSize: "14px", color: "#555" }}>Upload Resume (PDF/DOC):</label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
}

export default ApplyForm;