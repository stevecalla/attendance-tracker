import React from "react";
import Headerbar from "../components/homeAttendance/Navbar";
import FeaturesCarousel from "../components/homeAttendance/FeaturesCarousel";
import Footer from "../components/homeAttendance/Footer";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Home = () => {
  return (
    <>
      <Headerbar />
      <Container
        fluid
        className=""
        style={{
          height: "60vh",
          marginTop: "63px",
          backgroundColor: "#FCFAF2",
        }}
      >
        <Row>
          <Col className="">hello</Col>
          <Col className="">hello</Col>
        </Row>
      </Container>

      <Container
        fluid
        className=""
        style={{
          height: "60vh",
          marginTop: "100px",
          // border: "1px solid red",
        }}
      >
        <Row>
          <Col className="">hello</Col>
          <Col className="">hello</Col>
        </Row>
      </Container>
      <FeaturesCarousel />
      <Footer />
    </>
  );
};

export default Home;
