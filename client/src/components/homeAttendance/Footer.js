import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <Container
      fluid
      className="bg-body-tertiary w-100 mt-4"
      // bg="dark"
      data-bs-theme="dark"
      // style={{
      //   position: "fixed",
      //   right: 0,
      //   bottom: 0,
      //   left: 0,
      // }}
    >
      <Nav>
        <Nav.Link className="col-4" as={Link} to="/terms-privacy">
          Terms & Privacy
        </Nav.Link>
        <Col className="d-flex justify-content-center align-items-center col-4 m-0 text-light">
          CallaCodes LLC. &copy;{new Date().getFullYear()} 
        </Col>
        <Nav.Link className="col-4" as={Link} to="/contact-us">
          Contact Us
        </Nav.Link>
      </Nav>

      {/* <Row>
        <Col className="col-12 m-0 mb-2 text-light">
          CallaCodes LLC. &copy;{new Date().getFullYear()} 
        </Col>
      </Row> */}
    </Container>
  );
}

export default Footer;
