import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ jobsCount: 0, applicantsCount: 0, pendingCount: 0 });
  const [recruiterName, setRecruiterName] = useState("Recruiter");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // 1. Fetch Profile info to greet them nicely
        const profileRes = await fetch("http://localhost:5001/api/auth/profile", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setRecruiterName(profileData.name || "Recruiter");
        }

        // 2. Fetch Job Postings count
        const jobsRes = await fetch("http://localhost:5001/api/jobs", { // Adjust route if you have a specific /my-jobs route
          headers: { "Authorization": `Bearer ${token}` }
        });
        const jobsData = await jobsRes.json();
        const totalJobs = Array.isArray(jobsData) ? jobsData.length : 0;

        // 3. Fetch Applicants list to calculate statistics
        const appsRes = await fetch("http://localhost:5001/api/applications", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const appsData = await appsRes.json();
        const allApps = Array.isArray(appsData) ? appsData : [];
        
        const pendingApps = allApps.filter(app => !app.status || app.status.toLowerCase() === "pending").length;

        setStats({
          jobsCount: totalJobs,
          applicantsCount: allApps.length,
          pendingCount: pendingApps
        });
      } catch (error) {
        console.error("Error gathering stats metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <>
      <RecruiterNavbar />

      <div className="dashboard-container">
        {/* Welcome Section */}
        <header className="dashboard-header">
          <h1 className="recruiter">Welcome back, <span>{recruiterName}</span> 👋</h1>
          <p>Manage your active job postings and evaluate candidate submissions in real-time.</p>
        </header>

        {loading ? (
          <p style={{ textAlign: "center", padding: "40px" }}>Compiling recruitment statistics...</p>
        ) : (
          <>
            {/* Quick Metrics KPI Layout Grid */}
            <div className="stats-grid">
              <div className="stat-card blue-card" onClick={() => navigate("/my-jobs")}>
                <h3>💼 Active Postings</h3>
                <p className="stat-number">{stats.jobsCount}</p>
                <span className="stat-action">Manage Postings &rarr;</span>
              </div>

              <div className="stat-card green-card" onClick={() => navigate("/applicants")}>
                <h3>👥 Total Applicants</h3>
                <p className="stat-number">{stats.applicantsCount}</p>
                <span className="stat-action">Review Candidates &rarr;</span>
              </div>

              <div className="stat-card orange-card" onClick={() => navigate("/applicants")}>
                <h3>⏳ Pending Review</h3>
                <p className="stat-number">{stats.pendingCount}</p>
                <span className="stat-action">Needs Attention &rarr;</span>
              </div>
            </div>

            {/* Quick Quick-Action Panel Blocks */}
            <section className="quick-actions-panel">
              <h2>Quick Actions</h2>
              <div className="action-buttons-group">
                <button className="dashboard-btn primary-btn" onClick={() => navigate("/post-job")}>
                  ➕ Create New Job Posting
                </button>
                <button className="dashboard-btn secondary-btn" onClick={() => navigate("/applicants")}>
                  📋 View Application Pipeline
                </button>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;