import React from "react";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Headerbar from "../components/homeAttendance/Navbar";
import LoginForm from "../components/Login/LoginForm";
import SignupForm from "../components/Login/SignupForm";
import Message from "../components/Login/Message";
import Footer from "../components/homeAttendance/Footer";
import { CheckAsset } from "../components/Login/CheckAsset";

import Container from "react-bootstrap/Container";
import "../styles/button-home.css";
import "../styles/min-width.css";

const Login = ({
  renderPanel,
  messageButtonIsActive,
  loginButtonIsActive,
  signupButtonIsActive,
}) => {
  let navigate = useNavigate();

  return (
    <>
    <Headerbar />
    <Container className="min-width" style={{ marginTop: "85px"}}>
      <div className="d-flex flex-column align-items-center mt-3 overflow-auto">
        <div
          style={{
            height: "600px",
            minHeight: "600px",
            width: "330px",
            margin: "10px",
            boxShadow: "5px 5px 5px 5px gray",
            overflowY: "scroll",
          }}
        >
          <div className="mx-4 mt-4 mb-4" style={{ height: "150px" }}>
            <div className="d-flex justify-content-center align-content-center align-item-center">
              <CheckAsset widthArg={"160px"} heightArg={"150px"} />
            </div>
          </div>
          <div style={{ display: "flex", flex: "auto", width: "100%" }}>
            <button
              className={`baseline ${messageButtonIsActive && "isActive"}`}
              onClick={() => {
                console.log("click1");
                navigate("/messages");
              }}
            >
              Messages
            </button>
            <button
              disabled={Auth.loggedIn()}
              className={`baseline ${loginButtonIsActive && "isActive"}`}
              onClick={() => {
                console.log("click2");
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              disabled={Auth.loggedIn()}
              className={`baseline ${signupButtonIsActive ? "isActive" : ""}`}
              onClick={() => {
                console.log("click3");
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </div>

          {renderPanel === "messages" ? (
            <Message />
          ) : renderPanel === "login" ? (
            <LoginForm />
          ) : (
            <SignupForm />
          )}
        </div>
      </div>
    </Container>
    <Footer />
    </>
  );
};

export default Login;
