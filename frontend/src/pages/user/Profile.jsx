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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5001/api/auth/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

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
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
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

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5001/api/auth/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
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
            <p style={{ textAlign: "center", padding: "20px" }}>
              Loading profile...
            </p>
          ) : (
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