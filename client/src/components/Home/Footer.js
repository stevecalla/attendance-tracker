import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

import { CheckAsset } from "../../components/Login/CheckAsset";

// import logo from "../../assets/images/logo.bkg.png";
// import "../../styles/home-page.css";
import "../../styles/footer.css";


function Footer() {
  return (
    <footer>
      <section className="footer-container">
        <article className="footer-logo">
          <CheckAsset widthArg={"100px"} heightArg={"100px"} animate={false} />
        </article>

        <article className="footer-title">
          <h3 className="">Discover Better Tools to Track Attendance</h3>
        </article>

        <article className="footer-nav-links">
          <Nav.Link as={Link} to="/contact-us">
            Contact Us{" "}
          </Nav.Link>
          <Nav.Link as={Link} to="/terms-privacy">
            Terms & Privacy
          </Nav.Link>
        </article>
      </section>

      <p className="footer-copyright">
        &copy;{new Date().getFullYear()} CallaCodes LLC.
      </p>
    </footer>
  );
}
export default Footer;
