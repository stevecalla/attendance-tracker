import React, { useState, useEffect } from "react";

import { copyUtility } from "../../utils/copyUtility";

import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

function ViewCopyItem({ eventKeyProp, copyData, buttonContent, buttonType }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClipboardEnabled, setIsClipboardEnabled] = useState(true);

  //CONVERT DATA TO STRING; DATA IS PRESORTED
  let copyString = JSON.stringify(
    copyData?.map((list) => (list?.screenName ? list?.screenName : list))
  );

  //SETS ACCORDION BUTTON STYLE; NOT AVAILABLE IN BOOTSTRAP STRUCTURE
  useEffect(() => {
    setAccordionStyle();
  }, []);

  const setAccordionStyle = () => {
    let buttons = document.querySelectorAll(".viewCopy-header button");

    buttons.forEach((button) => {
      button.setAttribute("style", "width: 298px; height: 38px;");
    });
  };

  // PREVENTS ACCORDION FROM OPENING WHEN CLIPBOARD CLICKED
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  // COPY UTILITY
  const copyToClipboard = () => {
    try {
      copyUtility(copyString);

      disableClipboardCopy();

      // countDown();
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const disableClipboardCopy = () => {
    //SELECTS ALL CLIPBOARD SVG ICONS ACROSS SIBLING COMPONENTS
    let clipboardSvg = document.querySelectorAll(
      ".viewCopy-header .clipboardIcon"
    );

    // PREVENTS OVERLAPPING COPY & CLICKS
    clipboardSvg.forEach((svg) => {
      svg.setAttribute("style", "display: none");
    });

    setIsClipboardEnabled(false); //sets disabled styles

    setTimeout(() => {
      setIsClipboardEnabled(true); //sets disabled styles

      clipboardSvg.forEach((svg) => {
        svg.style.display = "block";
        svg.style.position = "absolute";
        svg.style.left = "235px";
        svg.style.zIndex = 5;
        svg.style.cursor = "pointer";
        svg.style.backgroundColor = "white";
        svg.style.color = "gray";
        svg.style.transform = "scale(1.2)";
      });
    }, 2000);
  };

  //SIGNAL COPIED. DISABLE/ENABLE
  // const [timeRemaining, setTimeRemaining] = useState(5); //seconds
  // const countDown = () => {
  //   const interval = setInterval(() => {
  //     setTimeRemaining(prevTime => {
  //       if (prevTime > 1) {
  //         return prevTime - 1;
  //       } else {
  //         clearInterval(interval);
  //         setTimeRemaining(5);
  //         return 0;
  //       }
  //     });
  //   }, 1000);
  // };

  return (
    <Accordion.Item eventKey={eventKeyProp}>
      <Accordion.Header
        className="viewCopy-header"
        style={{
          width: "300px",
        }}
      >
        <div
          style={isClipboardEnabled ? { color: "black" } : { color: "Green" }}
        >
          {/* {isClipboardEnabled ? buttonContent : `Copied! ${timeRemaining}`} */}
          {isClipboardEnabled ? buttonContent : `Copied! ✅`}
        </div>
        <FontAwesomeIcon
          title="Copy to clipboard"
          icon={faClipboard}
          className="clipboardIcon"
          onClick={(event) => {
            stopPropagation(event);
            isClipboardEnabled ? copyToClipboard() : console.log("heck");
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            position: "absolute",
            left: "235px",
            color: isHovering && isClipboardEnabled ? "green" : "gray",
            backgroundColor: "white",
            zIndex: "5",
            transform:
              isHovering && isClipboardEnabled ? "scale(1.7)" : "scale(1.2)",
            cursor: "pointer",
          }}
        />
      </Accordion.Header>
      <Accordion.Body style={{ overflow: "auto", height: "150px", padding: "5px", }}>
        {copyString === "[]" ? (
          "No Data Loaded"
        ) : buttonType === "scores" ? (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th style={{ textAlign: "center "}}>#</th>
                <th style={{ textAlign: "center "}}>Name</th>
                <th style={{ textAlign: "center "}}>Score</th>
                <th style={{ textAlign: "center "}}>MatchName</th>
              </tr>
            </thead>
            <tbody>
              {copyData?.map((list, index) => {
                console.log(list);
                return (
                  <tr key={list.participantId}>
                    <td>{index + 1}</td>
                    <td>{list.attendeeName}</td>
                    <td style={{ textAlign: "center "}}>{`${Math.floor(list.maxSimilarity * 100)}%`}</td>
                    <td>{list.matchName}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          copyString
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default ViewCopyItem;
