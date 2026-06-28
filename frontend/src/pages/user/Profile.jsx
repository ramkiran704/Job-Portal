import { useState } from "react";
import Navbar from "../../components/common/UserNavbar";
import Footer from "../../components/common/Footer";
import "../styles/Profile.css";

function Profile() {
  const [user, setUser] = useState({
    name: "Niya Ann Renjith",
    email: "niya@gmail.com",
    phone: "+91 xxxxxxxxxx",
    skills: "React, Node.js, MongoDB",
    experience: "Fresher",
    education: "B.Tech Computer Science",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Profile Saved Successfully!");
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

          <div className="profile-form">

            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />

            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />

            <label>Skills</label>
            <textarea
              rows="3"
              name="skills"
              value={user.skills}
              onChange={handleChange}
            ></textarea>

            <label>Experience</label>
            <input
              type="text"
              name="experience"
              value={user.experience}
              onChange={handleChange}
            />

            <label>Education</label>
            <input
              type="text"
              name="education"
              value={user.education}
              onChange={handleChange}
            />

            <label>Upload Resume</label>
            <input type="file" />

            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Profile;