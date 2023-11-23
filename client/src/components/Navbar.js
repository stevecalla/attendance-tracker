import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Headerbar() {
  return (
    <Navbar
      // fixed="top"
      sticky="top"
      expand="md"
      className="bg-body-tertiary mb-3"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="#home">Attendance Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="flex-grow-0" id="basic-navbar-nav">
          {/* <Nav className="me-auto"> */}
          <Nav className="">
            <Nav.Link href="#home">Login</Nav.Link>
            <Nav.Link href="#link">Logout</Nav.Link>
            <NavDropdown
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
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headerbar;
