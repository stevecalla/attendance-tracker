import React, { useState } from "react";

import { formatUnixToDayMonthDateYear } from "../../../utils/dateInfo";

import { Row, Col, Card } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function Meetings({ data }) {
  const [openDetails, setOpenDetails] = useState(false);

  const { zoom_meetings: meetings } = data?.zoomUserByUserId || [];

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

  return (
    <Row style={{ display: "flex", justifyContent: "center" }}>
      {meetings?.length === 0 ? (
        <Card className="p-2">
          No meetings at this time
        </Card>
      ) : (
        meetings?.map((meeting, index) => (
          <Card key={index} className="p-2 mb-1">
            <h5 className="d-flex flex-column mb-0">
              <button
                onClick={(event) => getElement(event)}
                aria-controls={`#collapse-client-${index}`}
                aria-expanded={openDetails}
                className={
                  meeting?.createdAt ? `btn btn-link pl-0` : `btn pl-0`
                }
                data-target={`#collapse-client-${index}`}
              >
                <p className="mb-0" style={{ textAlign: "left" }}>
                  {meeting?.createdAt
                    ? `${index + 1}) ${formatUnixToDayMonthDateYear(
                        meeting?.createdAt
                      )}`
                    : "No meetings at this time"}
                </p>
              </button>
            </h5>
            <Collapse>
              <div id={`#collapse-client-${index}`}>
                <Row>
                  <Col className="d-flex justify-start">
                    <p className="m-0">
                      <FontAwesomeIcon
                        className="px-3"
                        icon="fa-solid fa-envelope-open-text"
                      />
                      Id: {meeting?.mid}
                    </p>
                  </Col>
                </Row>
              </div>
            </Collapse>
          </Card>
        ))
      )}
    </Row>
  );
}

export default Meetings;
