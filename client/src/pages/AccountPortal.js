import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Headerbar from "../components/homeAttendance/Navbar";
import Footer from "../components/homeAttendance/Footer";
import Profile from "../components/AccountPortal/Profile";
import Zoom from "../components/AccountPortal/Zoom";
import ClientList from "../components/AccountPortal/Clients";

import { Button, Container, Col, Row } from "react-bootstrap/";
import "../styles/spinner.css";

//SECTION //render panel function
const renderPanelComponent = (panelView) => {
  switch (panelView) {
    case "profile":
      return <Profile />;
    case "zoom":
      return <Zoom />;
    case "app":
      return <ClientList />;
    default:
      return <Profile />;
  }
};

const AccountPortal = ({
  renderPanel,
  profileButtonIsActive,
  zoomButtonIsActive,
  appButtonIsActive,
}) => {
  let navigate = useNavigate();
  const [panelView, setPanelView] = useState("profile");

  useEffect(() => {
    setPanelView(renderPanel);
  }, [renderPanel]);

  return (
    <>
      <Headerbar />

      <Container style={{ marginTop: "25px" }}>
        <Row className="justify-content-center">
          <p style={{ fontSize: "30px", marginTop: "20px" }}>
            <b>Account Panel</b>
          </p>
        </Row>
      </Container>

      <Container className="mb-1">
        <Row>
          <Col>
            <div className="d-flex flex-row mb-1 p-0 border border-secondary rounded-lg">
              <Button
                variant="outline-primary"
                style={profileButtonIsActive ? isActive : notActive}
                active={profileButtonIsActive}
                onClick={() => {
                  navigate("/profile-panel");
                }}
              >
                Profile
              </Button>

              <Button
                variant="outline-primary"
                style={zoomButtonIsActive ? isActive : notActive}
                active={zoomButtonIsActive}
                onClick={() => {
                  navigate("/zoom-panel");
                }}
              >
                Zoom
              </Button>

              <Button
                variant="outline-primary"
                style={appButtonIsActive ? isActive : notActive}
                active={appButtonIsActive}
                onClick={() => {
                  navigate("/app-panel");
                }}
              >
                Apps
              </Button>
            </div>

            {renderPanelComponent(panelView)}

          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default AccountPortal;

const isActive = {
  flex: "auto",
  border: "solid 3px black",
  borderRadius: "3px",
};

const notActive = {
  flex: "auto",
  border: "none",
  borderRadius: "0",
  outline: "none",
  boxShadow: "none",
};
