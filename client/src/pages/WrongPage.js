import React, { useEffect } from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";

import { Home } from "./Home";

import { Container, Row, Button } from "react-bootstrap/";
import "../styles/button-style.css";

import wrongPageImg from "../assets/images-avif/404-not-found.avif";

const WrongPage = () => {
  const navigate = useNavigate();
  // const history = useHistory();

  // const homePage = () => {
  //     history.push("/home");
  // };

  return (
    <Container>
      <Row
        className=" justify-content-center align-items-center "
       
      >
        <Button
          // as={Link}
          // as={<Home />}
          // onClick={homePage}
          onClick={() => navigate("/home")}
          to="/jobs-panel"
          className="rounded-pill wrong-page-button"
          style={{ backgroundColor: "white", border: "none" }}
        >
          <img
            src={wrongPageImg}
            className = 'not-found'
            alt="404 Wrong Page"
           
          />
        </Button>
      </Row>
    </Container>
  );
};

export default WrongPage;
