import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful");
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);

        // Dynamically routing user based on account role type
        if (data.role === "employer") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        alert(`Login Failed: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend server.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome</h1>
        <p>Login to your Job Portal account</p>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        <div className="options">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;