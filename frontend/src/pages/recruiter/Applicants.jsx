import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/Applicants.css";

function Applicants() {

  const applicants = [

    {
      id:1,
      name:"Niya Ann",
      job:"Frontend Developer",
      status:"Pending"
    },

    {
      id:2,
      name:"Rahul",
      job:"Backend Developer",
      status:"Shortlisted"
    },

    {
      id:3,
      name:"Anjali",
      job:"UI Designer",
      status:"Rejected"
    }

  ];

  return (

    <>
      <RecruiterNavbar />

      <div className="applicants-page">

        <h1>Applicants</h1>

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Applied For</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {applicants.map(applicant => (

              <tr key={applicant.id}>

                <td>{applicant.name}</td>

                <td>{applicant.job}</td>

                <td>{applicant.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <Footer />

    </>
  );
}

export default Applicants;