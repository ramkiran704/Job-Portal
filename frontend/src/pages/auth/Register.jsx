import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Job Seeker",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Registration Successful!");

    navigate("/");
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Create Account</h1>

        <p>Join our Job Portal today</p>

        <div className="input-group">
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Role</label>

          <select
            name="role"
            onChange={handleChange}
          >
            <option>Job Seeker</option>
            <option>Recruiter</option>
          </select>
        </div>

        <button
          className="register-btn"
          onClick={handleRegister}
        >
          Register
        </button>

        <div className="login-link">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </div>

      </div>

    </div>
  );
}

export default Register;