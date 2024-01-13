import React from "react";

import Footer from "../components/Home/Footer";

import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../styles/home.css";

import delivery from "../assets/images-avif/delivery.avif";
import install from "../assets/images-avif/install.avif";
import cleaning from "../assets/images-avif/cleaning.avif";
import moving from "../assets/images-avif/moving.avif";
import optimize from "../assets/images-avif/optimize.avif";
import reconfig from "../assets/images-avif/reconfig.avif";
import zoomBackground from "../assets/images-avif/zoom-background.avif";

const Home = () => {
  return (
    <>
      {/* preload image to improve largest contentful paint in lighthouse */}
      <link rel="preload" href={zoomBackground} as="image"></link> 
      <main className="background-img">
        <br></br>
        <div className="overlay-container">
          <p className="overlay-header">
           Attendance Tracking
          </p>
          <p className="overlay-header">
           Made Easier
          </p>
          <p className="overlay-text">
            Attendance tracking is time consuming. On Zoom, participants 
            names don't match the roster, participant lists shift based 
            on the active speaker, participant names don't sort 
            alphabetically, no functionality exist to mark attendance, and
            participant lists are not extractable during the meeting. <br />
            <br />
            The Attendance Track aims to solve these pain points. This 
            feature rich applications includes the ability market participants
            present or absent, use fuzzy logic to match participants againsts
            the roster, search, filter & delete participants, copy to the 
            clipboard and save a roster.
          </p>  
          <a
            type="button"
            className="install-button"
            // fix add install link
            href="https://koala-huge-goldfish.ngrok-free.app/api/zoomapp/install"
            target="_blank"
            rel="noreferrer"
          >
            Install on Zoom
          </a>
        </div>
        <br></br>
      </main>

      <section>
        <p className="service-title">Powerful Features</p>
      </section>

      <Container>
        <Row>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={delivery} alt="Delivery truck and workers unloading content"/>
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>Delivery</Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  We will pick up all items directly from your chosen
                  distrubutor. No need to hire an additional company for
                  delivery.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={moving} alt="Unpacked boxes in an office space"/>
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>Moving</Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  Make your office move smooth and easy as we safely pack your
                  office and bring to your new location.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={install} alt="Cabinet installation in progress"/>
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>
                  Installation
                </Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  Our qualified team can install cubicles, office furniture,
                  workstations, seating, conference rooms, and more.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img className="pics" variant="top" src={cleaning} alt="Workers cleaning an office space"/>
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>Cleaning</Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  No mess left behind. Your office space will be fully cleaned
                  and all packaging material will be disposed responsibly.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={optimize} alt="Optimized office layout"/>
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>
                  Space Analytics
                </Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  Our team has set up thousands of office spaces, let us help
                  guide your installation process.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
               <Card.Img variant="top" src={reconfig} alt="Optimized office reconfigured"/>
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>
                  Reconfiguration
                </Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  Let our Experts advise on the perfect office arrangement to
                  optimize team perfomance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
