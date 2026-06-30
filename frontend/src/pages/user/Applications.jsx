import { useEffect, useState } from "react";
import UserNavbar from "../../components/user/UserNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/Applications.css";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        // ✅ FIXED: Changed URL from /api/applications to /api/applications/my-apps
        const response = await fetch("http://localhost:5000/api/applications/my-apps", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();
        
        if (response.ok) {
          const extractedApps = Array.isArray(data) ? data : data.applications || data.data || [];
          setApplications(extractedApps); 
        } else {
          console.error("Backend error:", data.message);
        }
      } catch (error) {
        console.error("Error connecting to applications API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, []);

  return (
    <>
      <UserNavbar />

      <div className="applications-page">
        <h1>My Applications</h1>
        

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading your records...</p>
        ) : applications.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>You haven't applied to any positions yet.</p>
        ) : (
          <div className="applications-list">
            {applications.map((app) => (
              <div className="application-card" key={app._id}>
                {/* Dynamically reads properties populated by your backend handler */}
                <h2>{app.jobId?.title || "Position Applied"}</h2>
                <h3>{app.jobId?.company || "Company Profile Verified"}</h3>
                
                <p><strong>Location:</strong> {app.jobId?.location || "Not Specified"}</p>
                <p><strong>Applicant Name:</strong> {app.fullName}</p>
                <p><strong>Qualification:</strong> {app.qualification}</p>
                
                {app.resume && (
                  <p>
                    <strong>Resume Attached:</strong>{" "}
                    <a href={`http://localhost:5000/${app.resume.replace(/\\/g, '/')}`} target="_blank" rel="noreferrer" style={{color: "#007bff", textDecoration: "underline"}}>
                      View Uploaded Document
                    </a>
                  </p>
                )}

                <span className={`status ${app.status?.toLowerCase() || "pending"}`}>
                  {app.status || "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Applications;