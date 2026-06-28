import "../styles/Home.css";

function Home() {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      salary: "₹12 LPA",
    },
    {
      title: "Backend Developer",
      company: "Microsoft",
      location: "Hyderabad",
      salary: "₹15 LPA",
    },
    {
      title: "UI/UX Designer",
      company: "Amazon",
      location: "Kochi",
      salary: "₹10 LPA",
    },
    {
      title: "Full Stack Developer",
      company: "Adobe",
      location: "Pune",
      salary: "₹18 LPA",
    },
  ];

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-left">
          

          <h1>
            Find Your <span>Dream Job</span>
          </h1>

          <p>
            Connect with top companies, discover exciting career opportunities,
            and apply with one click.
          </p>

          <div className="search-box">
            <input type="text" placeholder="Job title or keyword" />
            <button>Search</button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700"
            alt="office"
          />
        </div>
      </section>
      {/* Stats */}

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

          {jobs.map((job, index) => (

            <div className="card" key={index}>

              <h3>{job.title}</h3>

              <p>{job.company}</p>

              <small>{job.location}</small>

              <h4>{job.salary}</h4>

              <button>Apply Now</button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;