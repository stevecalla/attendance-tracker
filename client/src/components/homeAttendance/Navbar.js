import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Auth from "../../utils/auth";
import { CheckAsset } from "../../components/Login/CheckAsset";

function Headerbar() {
  return (
    <Navbar
      fixed="top"
      // sticky="top"
      expand="md"
      className="bg-body-tertiary mb-3"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container className="">
        <Navbar.Brand
          as={Link}
          reloadDocument
          to="/"
          className="d-flex flex-nowrap mx-0"
        >
          <CheckAsset widthArg={"35px"} heightArg={"35px"} />

          <div className="d-flex align-items-center ms-2">
            The Attendance Tracker
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="flex-grow-0" id="basic-navbar-nav">
          <Nav className="">
            {Auth.loggedIn() ? (
              <Nav.Link onClick={Auth.logout} as={Link}>
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}

            {/* <NavDropdown
              // drop="start"
              title="Account"
              id="basic-nav-dropdown"
              className=""
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headerbar;
