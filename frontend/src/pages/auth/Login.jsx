import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    // Later replace this with backend authentication

    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter email and password");
      return;
    }

    navigate("/home");
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

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
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

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="register-link">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;