import { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from "react-bootstrap/Accordion";

function AttendeeInput({
  handleAttendeeInput,
  isSubmitIconDisplayable,
  setIsSubmitIconDisplayable,
  handleSaveStorage,
  handleRetrieveStorage,
  isRetrieveIconDiplayable,
  setIsRetrieveIconDisplayable,
}) {
  const [isSubmitHovering, setIsSubmitHovering] = useState(false);
  const [isSaveHovering, setIsSaveHovering] = useState(false);
  const [isRetrieveHovering, setIsRetrieveHovering] = useState(false);
  const attendeeInputRef = useRef(null); //Sets focus on textarea

  useEffect(() => {
    setAccordionStyle();
  }, []);

  //SETS ACCORDION BUTTON STYLE; NOT AVAILABLE IN BOOTSTRAP STRUCTURE
  const setAccordionStyle = () => {
    let buttons = document.querySelectorAll(".attendeeInput-header button");

    buttons.forEach((button) => {
      button.setAttribute("style", "width: 298px; height: 38px;");
    });
  };

  return (
    <Accordion
      style={{ position: "relative", width: "300px", marginBottom: "5px" }}
    >
      <Accordion.Item eventKey="0">
        <Accordion.Header
          className="attendeeInput-header"
          style={{ width: "300px" }}
        >
          {`Enter Attendee Roster`}
        </Accordion.Header>
        <FontAwesomeIcon
          icon="fa-solid fa-rotate-right"
          title="Submit roster"
          onClick={handleAttendeeInput}
          onMouseEnter={() => setIsSubmitHovering(true)}
          onMouseLeave={() => setIsSubmitHovering(false)}
          style={
            isSubmitIconDisplayable
              ? {
                  zIndex: 4,
                  position: "absolute",
                  right: "45px",
                  top: "12px",
                  color: isSubmitHovering ? "green" : "gray",
                  transform: isSubmitHovering ? "scale(1.2)" : "scale(1.0)",
                }
              : { display: "none" }
          }
        />
        <FontAwesomeIcon
          icon="fa-solid fa-save"
          title="Save roster"
          onClick={handleSaveStorage}
          onMouseEnter={() => setIsSaveHovering(true)}
          onMouseLeave={() => setIsSaveHovering(false)}
          style={
            isSubmitIconDisplayable
              ? {
                  zIndex: 4,
                  position: "absolute",
                  right: "67px",
                  top: "12px",
                  color: isSaveHovering ? "blue" : "gray",
                  transform: isSaveHovering ? "scale(1.2)" : "scale(1.0)",
                }
              : { display: "none" }
          }
        />
        <FontAwesomeIcon
          icon="fa-solid fa-cloud"
          title="Upload roster"
          onClick={handleRetrieveStorage}
          onMouseEnter={() => setIsRetrieveHovering(true)}
          onMouseLeave={() => setIsRetrieveHovering(false)}
          style={
            isRetrieveIconDiplayable
              ? {
                  zIndex: 4,
                  position: "absolute",
                  right: "87px",
                  top: "12px",
                  color: isRetrieveHovering ? "blue" : "gray",
                  transform: isRetrieveHovering ? "scale(1.2)" : "scale(1.0)",
                }
              : { display: "none" }
          }
        />
        <Accordion.Body
          as="textarea"
          id="attendeeInput"
          ref={attendeeInputRef}
          onEntering={() => {
            attendeeInputRef.current.focus();
          }}
          onChange={(event) =>
            event.target.value.length > 0
              ? (
                  setIsSubmitIconDisplayable(true)
                  // , setIsRetrieveIconDisplayable(false)
                )
              : setIsSubmitIconDisplayable(false)
          }
          placeholder={`Enter roster with semi-colon separator (i.e. "John Doe; Doe, Jane"). Click green submit arrow.`}
          style={{
            overflow: "auto",
            height: "150px",
            width: "295px",
            border: "none",
          }}
        ></Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AttendeeInput;
