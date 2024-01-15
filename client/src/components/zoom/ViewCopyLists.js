import React from "react";

import ViewCopyItem from "./ViewCopyItem";

import Accordion from "react-bootstrap/Accordion";

function ViewCopyLists({
  allParticipants = [],
  participantsMutable = [],
  matchResults = [],
  tabView = "",
}) {
  console.log(matchResults);

  return (
    <Accordion
      style={{ position: "relative", width: "300px", marginBottom: "5px" }}
    >
      <ViewCopyItem
        eventKeyProp={0}
        copyData={allParticipants}
        buttonContent="View All"
      />
      {tabView !== "attendance" && (
        <ViewCopyItem
          eventKeyProp={1}
          copyData={participantsMutable}
          buttonContent="View Filtered"
        />
      )}
      {tabView === "attendance" && (
        <ViewCopyItem
          eventKeyProp={2}
          copyData={matchResults}
          buttonContent="View Match Score(s)"
          buttonType="scores"
        />
      )}
    </Accordion>
  );
}

export default ViewCopyLists;
