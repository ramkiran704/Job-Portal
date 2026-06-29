import { useState, useEffect } from "react";
import UserNavbar from "../../components/user/UserNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/Profile.css";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [loading, setLoading] = useState(true);

  // 1. Fetch live profile details on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            skills: data.skills || "",
            experience: data.experience || "",
            education: data.education || "",
          });
        } else {
          console.error("Failed to load user profile details:", data.message);
        }
      } catch (error) {
        console.error("Error connecting to server profile endpoint:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // 2. Submit modified credentials back to MongoDB
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated in database successfully!");
      } else {
        alert(`Failed to save changes: ${data.message}`);
      }
    } catch (error) {
      console.error("Profile saving error:", error);
      alert("An error occurred while updating profile context values.");
    }
  };

  return (
    <>
      <UserNavbar />

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
            />
            <h1>My Profile</h1>
          </div>

          {loading ? (
            <p style={{ textAlign: "center", padding: "20px" }}>Loading profile details from database...</p>
          ) : (
            <div className="profile-form">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />

              {/* ✅ FIXED: Email input is now fully editable and synced with state */}
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />

              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Enter contact number"
              />

              <label>Skills</label>
              <textarea
                rows="3"
                name="skills"
                value={user.skills}
                onChange={handleChange}
                placeholder="E.g., React, Node.js, Express, MongoDB"
              ></textarea>

              <label>Experience</label>
              <input
                type="text"
                name="experience"
                value={user.experience}
                onChange={handleChange}
                placeholder="E.g., Fresher or 2 Years"
              />

              <label>Education</label>
              <input
                type="text"
                name="education"
                value={user.education}
                onChange={handleChange}
                placeholder="E.g., B.Tech Computer Science"
              />

              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;