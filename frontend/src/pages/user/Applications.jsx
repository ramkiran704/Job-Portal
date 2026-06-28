import UserNavbar from "../../components/user/UserNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/Applications.css";

function Applications() {
  const applications = [
    {
      id: 1,
      jobTitle: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      status: "Under Review",
    },
    {
      id: 2,
      jobTitle: "Backend Developer",
      company: "Microsoft",
      location: "Hyderabad",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      jobTitle: "UI/UX Designer",
      company: "Amazon",
      location: "Kochi",
      status: "Rejected",
    },
  ];

  return (
    <>
      <UserNavbar />

      <div className="applications-page">

        <h1>My Applications</h1>

        <p>Track the status of all your job applications.</p>

        <div className="applications-list">

          {applications.map((application) => (

            <div className="application-card" key={application.id}>

              <h2>{application.jobTitle}</h2>

              <h3>{application.company}</h3>

              <p>
                <strong>Location:</strong> {application.location}
              </p>

              <span
                className={`status ${application.status
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                {application.status}
              </span>

            </div>

          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Applications;