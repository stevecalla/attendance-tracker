import React from "react";

import Headerbar from "../components/homeAttendance/Navbar";
import Check from "../components/homeAttendance/Check";
import FeaturesCarousel from "../components/homeAttendance/FeaturesCarousel";
import Footer from "../components/homeAttendance/Footer";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/home-page.css";
import "../styles/min-width.css";

import appStatic from "../assets/images/homePage-app-static.png";
import appGif from "../assets/images/homePage-app.gif";

export const Home = () => {
  return (
    <>
      <Headerbar />

      {/* panel #1 */}
      <Container className="d-flex justify-content-center top-container px-3 min-width">
        <Col className="d-flex flex-column align-items-center w-100 custom-background  custom-border px-4">
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
            // href="http://www.google.com"
            href="https://koala-huge-goldfish.ngrok-free.app/api/zoomapp/install"
            target="_blank"
            rel="noreferrer"
          >
            Install on Zoom
          </a>
        </Col>
        {/* </Row> */}
      </Container>

      {/* panel #2 */}
      <Container className="mt-3 min-width">
        <Row className="row">
          <Col className="col-12 col-md-6 custom-padding-left">
            <div className="d-flex flex-column align-items-center custom-border  w-100 h-100">
              <h2 className="title mt-3">Powerful Features</h2>
              <div className="d-flex flex-column text-start w-75 subtitle">
                <p className="">
                  <Check />
                  Mark present or absent
                </p>
                <p className="">
                  <Check />
                  Fuzzy logic match
                </p>
                <p className="">
                  <Check />
                  Search, filter, delete
                </p>
                <p className="">
                  <Check />
                  Copy to clipboard
                </p>
                <p className="">
                  <Check />
                  Save roster
                </p>
              </div>
            </div>
          </Col>
          <Col className="col-12 col-md-6 custom-padding-right">
            <div className="d-flex flex-column align-items-center border custom-border-fancy custom-background mt-2 mt-md-0 w-100">
              <img
                className="static-image my-2"
                // src={appGif}
                src={appStatic}
                alt="Demo of Attendance Tracker"
                fetchpriority="high"
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* panel #3 */}
      <Container className="mt-3 px-3 min-width">
        <Col className="d-flex flex-column align-items-center w-100 custom-background custom-border">
          <FeaturesCarousel />
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
