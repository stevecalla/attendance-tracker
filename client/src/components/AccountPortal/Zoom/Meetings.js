import React, { useState } from "react";

import { formatUnixToDayMonthDateYear } from "../../../utils/dateInfo";

import { Row, Col, Container, Card } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function Meetings({ data }) {
  const { zoom_meetings: meetings } = data.zoomUserByUserId;

  const [openDetails, setOpenDetails] = useState(false);

  // SECTION HANDLE COLLAPSE
  const getElement = (event) => {
    let currentAvailTarget = event.currentTarget.getAttribute("data-target");

    let currentAvailTable = document.getElementById(currentAvailTarget);

    if (currentAvailTable.classList.contains("show")) {
      currentAvailTable.classList.remove("show");
      setOpenDetails(false);
    } else {
      currentAvailTable.classList.add("show");
      setOpenDetails(true);
    }
  };

  if (meetings.length === 0) {
    console.log("test");
    return (
      <Container style={{ height: "60vh" }}>
        <Row>
          <Card className="rounded p-2 text-left" style={{ width: "98%" }}>
            No meetings at this time
          </Card>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container style={{ height: "60vh" }}>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {meetings?.map((meeting, index) => (
            <div id="accordion" key={index} style={{ width: "98%" }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{
                    color: "black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h5 className="d-flex flex-column mb-0 text-left">
                    <button
                      onClick={(event) => getElement(event)}
                      aria-controls={`#collapse-client-${index}`}
                      aria-expanded={openDetails}
                      className={
                        meeting?.createdAt ? `btn btn-link pl-1` : `btn pl-1`
                      }
                      data-target={`#collapse-client-${index}`}
                    >
                      <p className="mb-0 text-left">
                        {meeting?.createdAt
                          ? `${index + 1}) ${formatUnixToDayMonthDateYear(
                              meeting?.createdAt
                            )}`
                          : "No meetings at this time"}
                      </p>
                    </button>
                  </h5>
                </div>
                <Collapse>
                  <div id={`#collapse-client-${index}`}>
                    <Container>
                      <Row>
                        <Col className="d-flex justify-start">
                          <p className="m-0">
                            <FontAwesomeIcon
                              className="px-2"
                              icon="fa-solid fa-envelope-open-text"
                            />
                            Id: {meeting?.mid}
                          </p>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Meetings;
