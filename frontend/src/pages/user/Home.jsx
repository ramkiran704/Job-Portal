import "../../styles/Home.css";
import UserNavbar from "../../components/user/UserNavbar";
import Footer from "../../components/common/Footer";
import JobCard from "../../components/common/JobCard";

function Home() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      salary: "₹12 LPA",
      type: "Full Time",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Microsoft",
      location: "Hyderabad",
      salary: "₹15 LPA",
      type: "Remote",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Amazon",
      location: "Kochi",
      salary: "₹10 LPA",
      type: "Hybrid",
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "Adobe",
      location: "Pune",
      salary: "₹18 LPA",
      type: "Full Time",
    },
  ];

  return (
    <>
      <UserNavbar />

      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-left">
            <h1>
              Find Your <span>Dream Job</span>
            </h1>

            <p>
              Connect with top companies, discover exciting career
              opportunities, and apply with one click.
            </p>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search by job title, company..."
              />
              <button>Search</button>
            </div>
          </div>

          <div className="hero-right">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700"
              alt="Office"
            />
          </div>
        </section>

        {/* Statistics */}
        <section className="stats">
          <div className="stat">
            <h2>1000+</h2>
            <p>Jobs Posted</p>
          </div>

          <div className="stat">
            <h2>500+</h2>
            <p>Companies</p>
          </div>

          <div className="stat">
            <h2>20K+</h2>
            <p>Candidates</p>
          </div>

          <div className="stat">
            <h2>95%</h2>
            <p>Hiring Rate</p>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="featured">
          <h2>Featured Jobs</h2>

          <div className="jobs">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Home;