import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

import { CheckAsset } from "../components/Login/CheckAsset";

import { Navbar, Nav } from "react-bootstrap";
import "../styles/navbar.css";
import "../styles/min-width.css";

const AppNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="xl" className="custom-nav px-3 min-width">
      <Navbar.Brand
        as={Link}
        reloadDocument
        to="/"
        className="d-flex flex-nowrap mx-0"
      >
        <CheckAsset widthArg={"60px"} heightArg={"60px"} animate={true} />

        <div className="brand-container">
          <h2 className="brand-name">The Attendance Tracker</h2>
          {/* <h6 className="slogan">
            Office Furniture Installation At The Snap Of Your Fingers!
          </h6> */}
        </div>
      </Navbar.Brand>

      <Navbar.Toggle
        className="hamburger"
        aria-controls="responsive-navbar-nav"
      />

      <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
        <Nav className="custom-nav ml-auto">
          <Nav.Link className="navLink" as={Link} to="/">
            Home
          </Nav.Link>

          {/* {Auth.loggedIn() &&
            Auth.isAdmin() === true &&
            Auth.isLocked() === false && (
              <>
                <Nav.Link className="navLink" as={Link} to="/jobs-panel" reloadDocument>
                  Admin
                </Nav.Link>
              </>
            )} */}

          {Auth.loggedIn() && Auth.isLocked() === false && (
            <>
              <Nav.Link
                className="navLink"
                as={Link}
                to="/profile"
                reloadDocument
              >
                Account
              </Nav.Link>
            </>
          )}

          {!Auth.loggedIn() && (
            <>
              <Nav.Link className="navLink" as={Link} to="/contact-us">
                Contact Us
              </Nav.Link>
            </>
          )}

          {!Auth.loggedIn() && (
            <>
              <Nav.Link className="navLink" as={Link} to="/login">
                Login
              </Nav.Link>
            </>
          )}

          {(Auth.loggedIn() && Auth.isLocked() === false) && (
            <>
              <Nav.Link className="navLink" onClick={Auth.logout}>
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
