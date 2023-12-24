import React from "react";
import Headerbar from "../components/homeAttendance/Navbar";
import FeaturesCarousel from "../components/homeAttendance/FeaturesCarousel";
import Footer from "../components/homeAttendance/Footer";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/home-page.css";
import "../styles/min-width.css";
// import background from "../assets/images/BoulderBackgroundImage.jpeg";
import appStatic from "../assets/images/homePage-app-static.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Home = () => {
  return (
    <>
      <Headerbar />
      {/* panel #1 */}
      <Container className="d-flex justify-content-center top-container px-3 min-width">
        <Col className="d-flex flex-column align-items-center w-100 custom-background border px-4">
          <h2 className="title mt-3">
            Attendance Tracking.{" "}
            <span className="title-color">Made Easier.</span>
          </h2>
          <div className="subtitle">
            Simplifying attendance tracking to save you time to teach.
          </div>
          <a
            type="button"
            className="btn btn-primary btn-lg my-3"
            // fix add install link
            href="http://www.google.com"
            target="_blank"
            rel="noreferrer"
          >
            Install on Zoom
          </a>
        </Col>
        {/* </Row> */}
      </Container>
      {/* panel #2 */}
      <Container className="mt-3  min-width">
        <Row className="h-100 px-3">
          <Col
            className="d-flex flex-column align-items-center col-12 col-md-6 custom-background border"
            // style={{
            //   maxWidth: "600px",
            // }}
          >
            <h2 className="title mt-3">Powerful Features</h2>
            <div className="d-flex flex-column text-start w-75 subtitle">
              <p className="">
                <FontAwesomeIcon
                  icon="fa-solid fa-check"
                  size="lg"
                  className="me-2"
                  style={{
                    color: "green",
                  }}
                />
                Mark present or absent
              </p>
              <p className="">
                <FontAwesomeIcon
                  icon="fa-solid fa-check"
                  size="lg"
                  className="me-2"
                  style={{
                    color: "green",
                  }}
                />
                Fuzzy logic match
              </p>
              <p className="">
                <FontAwesomeIcon
                  icon="fa-solid fa-check"
                  size="lg"
                  className="me-2"
                  style={{
                    color: "green",
                  }}
                />
                Search, filter, delete
              </p>
              <p className="">
                <FontAwesomeIcon
                  icon="fa-solid fa-check"
                  size="lg"
                  className="me-2"
                  style={{
                    color: "green",
                  }}
                />
                Copy to clipboard
              </p>
              <p className="">
                <FontAwesomeIcon
                  icon="fa-solid fa-check"
                  size="lg"
                  className="me-2"
                  style={{
                    color: "green",
                  }}
                />
                Save roster
              </p>
            </div>
          </Col>
          <Col className="d-flex flex-column align-items-center col-12 col-md-6 custom-background border mt-2 mt-md-0">
            <img
              className="static-image my-2"
              src={appStatic}
              alt="Attendance Tracker"
            />
          </Col>
        </Row>
      </Container>
      <Container className="mt-3 px-3 min-width">
        <Col className="d-flex flex-column align-items-center w-100 custom-background border">
          <FeaturesCarousel />
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
