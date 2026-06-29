import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import Footer from "../../components/common/Footer";
import "../../styles/Dashboard.css";
function Dashboard() {
  return (
    <>
      <RecruiterNavbar />

      <div style={{padding:"50px"}}>
        <h1>Recruiter Dashboard</h1>
      </div>
    </>
  );
}

export default Dashboard;