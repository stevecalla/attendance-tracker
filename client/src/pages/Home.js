import React, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Footer from "../components/Home/Footer";
import "../styles/home.css";
import "../styles/min-width.css";

import list from "../assets/images-avif/manageListofPeople.avif";
import absent from "../assets/images-avif/absentEmptySeatInClass.avif";
import roster from "../assets/images-avif/rosterLineOfPeople.avif";
import fuzzy from "../assets/images-avif/fuzzyCodingOnComputer.avif";
import copy from "../assets/images-avif/copyMachine.avif";
import zoomBackground from "../assets/images-avif/zoom-background-v3.avif";

// import appStatic from "../assets/images/homePage-app-static.png";
import appGif from "../assets/images/homePage-app.gif";

const Home = () => {
  const [display, setDisplay] = useState(true);

  const handleDemoClick = (e) => {
    e.preventDefault();
    setDisplay(!display);
  };

  //SECTION RENDER FEATURES OBJECT
  const features = [
    {
      src: list,
      title: "Manage List",
      alt: "Manage a list of participants manually on paper",
      text: "Manage the participant list by searching, filtering or deleting. Refresh the participant list manually.",
    },
    {
      src: absent,
      title: "Mark Absent",
      alt: "Empty seats in a classroom setting",
      text: "Mark participants as present or absent as you reconcile with third-party attendance system.",
    },
    {
      src: roster,
      title: "Save Roster",
      alt: "Line of people attending an event",
      text: "Input and save a meeting roster that can be used to manually take attendance starting with automatic fuzzy logic.",
    },
    {
      src: fuzzy,
      title: "Fuzzy Match",
      alt: "Computer code",
      text: "Match the participant list against the roster using fuzzy logic to manage spelling differences. View the match score/name and adjust the roster as necessary.",
    },
    {
      src: copy,
      title: "Copy List",
      alt: "Old fashion copy machine",
      text: "Copy the participant or fuzzy match list to the clipboard to use with third-party attendance systems.",
    },
  ];

  const isNotDisplayed = {
    display: "none",
  };

  const isDisplayed = {
    display: "block",
  };

  return (
    <>
      {/* preload image to improve largest contentful paint in lighthouse */}
      <link rel="preload" href={zoomBackground} as="image"></link>

      {/* SECTION HERO IMAGE & OVERLAY & DEMO */}
      <main className="background-image min-width">
        <br></br>

        <div
          className="overlay-container min-width"
          style={display ? isDisplayed : isNotDisplayed}
        >
          <p className="overlay-header">Attendance Tracking</p>
          <p className="overlay-header">Made Easier</p>
          <p className="overlay-text">
            Attendance tracking is time consuming. On Zoom, participants names
            don't match the roster, participant lists shift based on the active
            speaker, participant names don't sort alphabetically, no
            functionality exist to mark attendance, and participant lists are
            not extractable during the meeting. <br />
            <br />
            The Attendance Track aims to solve these pain points. This feature
            rich applications includes the ability market participants present
            or absent, use fuzzy logic to match participants againsts the
            roster, search, filter & delete participants, copy to the clipboard
            and save a roster.
          </p>
          <a
            type="button"
            className="install-button"
            // fix add install link
            href="https://koala-huge-goldfish.ngrok-free.app/api/zoomapp/install"
            target="_blank"
            rel="noreferrer"
          >
            Zoom Install
          </a>

          <button className="demo-button" onClick={handleDemoClick}>
            Demo
          </button>
        </div>

        <div
          className="custom-fancy-border min-width"
          onClick={handleDemoClick}
          style={display ? isNotDisplayed : isDisplayed}
        >
          <p className="overlay-header">Tracker Demo</p>
          <img
            className="demo-image"
            src={appGif}
            // src={appStatic}
            alt="Demo of Attendance Tracker"
            fetchpriority="high"
          />
        </div>

        <br></br>
      </main>

      {/* SECTION FEATURE CARD HEADER */}
      <section className="min-width">
        <p className="feature-title">Powerful Features</p>
      </section>

      {/* SECTION FEATURE CARDS */}
      <Container className="min-width">
        <Row>
          {features?.map(({ src, title, text }, index) => (
            <Col key={index} className="d-flex justify-content-center mb-2">
              <Card className="custom-card">
                <Card.Img
                  className="custom-card-image"
                  variant="top"
                  src={src}
                  alt="Empty seats in a classroom setting"
                />
                <Card.Body>
                  <Card.Title className="custom-card-title">{title}</Card.Title>
                  <Card.Text className="custom-card-text">{text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
