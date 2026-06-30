import { useEffect, useState } from "react";
import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/Applicants.css";

function Applicants() {
  // 1. Initialize state for live database records
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch submissions targeting this recruiter's job postings
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // This hits your central application route, which filters based on recruiter ID inside the token
        const response = await fetch("http://localhost:5001/api/applications", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        if (response.ok) {
          // Fallback array parsing depending on how your backend wraps response data payloads
          const extractedApps = Array.isArray(data) ? data : data.applications || data.data || [];
          setApplicants(extractedApps);
        } else {
          console.error("Backend error message:", data.message);
        }
      } catch (error) {
        console.error("Failed connecting to incoming application streams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  // 3. Optional: Handle Status Updates (e.g., Shortlist/Reject buttons)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/applications/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setApplicants(applicants.map(app => app._id === id ? { ...app, status: newStatus } : app));
        alert(`Application status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <RecruiterNavbar />

      <div className="applicants-page">
        <h1>Received Applications</h1>

        {loading ? (
          <p style={{ textAlign: "center" }}>Fetching incoming applications...</p>
        ) : applicants.length === 0 ? (
          <p style={{ textAlign: "center", margin: "30px 0" }}>No candidates have applied to your job postings yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Applied For</th>
                <th>Qualification</th>
                <th>Resume</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant._id}>
                  {/* Pulls candidate information submitted via application body form */}
                  <td><strong>{applicant.fullName || "Anonymous Seeker"}</strong><br/>{applicant.email}</td>
                  
                  {/* Safely accesses populated Mongoose Job schema titles */}
                  <td>{applicant.jobId?.title || "Unknown Position"}</td>
                  
                  <td>{applicant.qualification || "N/A"}</td>
                  
                  <td>
                    {applicant.resume ? (
                      <a 
                        href={`http://localhost:5001/${applicant.resume.replace(/\\/g, '/')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ color: "#007bff", textDecoration: "underline" }}
                      >
                        View Resume File
                      </a>
                    ) : (
                      "No file attached"
                    )}
                  </td>
                  
                  <td>
                    <span className={`status ${applicant.status?.toLowerCase() || "pending"}`}>
                      {applicant.status || "Pending"}
                    </span>
                  </td>

                  <td>
                    <select 
                      value={applicant.status || "Pending"} 
                      onChange={(e) => handleStatusChange(applicant._id, e.target.value)}
                      style={{ padding: "5px", borderRadius: "4px" }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shortlisted">Shortlist</option>
                      <option value="Rejected">Reject</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Applicants;