import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>JobPortal</h2>
          <p>
            Find your dream job with top companies across India.
          </p>
        </div>

        

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@jobportal.com</p>
          <p>Phone: +91 xxxxxxxxxx</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 JobPortal. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;