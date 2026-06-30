import { useState, useEffect } from "react";
import "../../styles/Home.css";
import UserNavbar from "../../components/user/UserNavbar";
import Footer from "../../components/common/Footer";
import JobCard from "../../components/common/JobCard";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allJobs, setAllJobs] = useState([]); // Real DB data
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Fetch jobs dynamically from MongoDB when the page loads
  useEffect(() => {
    const fetchLiveJobs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/jobs");
        const data = await response.json();
        
        if (response.ok) {
          setAllJobs(data);
          setFilteredJobs(data); // Default view shows all jobs
        }
      } catch (error) {
        console.error("Failed to fetch jobs for homepage:", error);
      }
    };
    fetchLiveJobs();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredJobs(allJobs);
      return;
    }

    const result = allJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(result);
  };

  return (
    <>
      <UserNavbar />
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-left">
            <h1><span>Find Your Dream Job</span></h1>
            <p>Connect with top companies, discover exciting career opportunities, and apply with one click.</p>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by job title, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
          <div className="hero-right">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700" alt="Office" />
          </div>
        </section>

        {/* Featured Jobs From Database */}
        <section className="featured">
          <h2>Featured Jobs</h2>
          <div className="jobs">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} /> // Using live MongoDB _id
              ))
            ) : (
              <p>No active job openings found</p>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;