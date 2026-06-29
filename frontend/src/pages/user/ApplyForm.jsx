import { useState } from "react";
import "../../styles/ApplyForm.css";

function ApplyForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    resume: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application submitted successfully!");
    console.log(formData);
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

          <input
            type="text"
            name="resume"
            placeholder="Resume Link"
            value={formData.resume}
            onChange={handleChange}
          />

          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
}

export default ApplyForm;