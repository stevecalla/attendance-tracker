import Headerbar from "../homeAttendance/Navbar";
import Footer from "../homeAttendance/Footer";
// import Button from "react-bootstrap/Button";
import "../../styles/min-width.css";

function ContactUs() {
  const handleShiftEmail = (e) => {
    e.preventDefault();
    launchEmailPlatform();
  };

  // Open preferred email provide and prepopulate
  const launchEmailPlatform = () => {
    window.open(
      `mailto:colinmichael89@gmail.com?&subject=Shift Coverage&body=Hello Colin - I'd like to take the shift as X company on Y day of the week if available. I look forward to hearing from you.`
    );
    return false;
  };
  return (
    <>
      <Headerbar />
      <div
        className="d-flex justify-content-center min-width"
        style={{
          marginTop: "100px",
          height: "80vh",
        }}
      >
        <p>Contact us at: </p>
        <p> </p>
        <a
          href="mailto:callasteven@gmail.com"
          onClick={(e) => handleShiftEmail(e)}
          className="ms-2"
        >
          callasteven@gmail.com
        </a>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
