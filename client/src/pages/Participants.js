import React, { Suspense, lazy, useContext } from "react";
import { ParticipantContext } from "./MainPortal";

import AttendeeList from "../components/AttendeeList";
import SearchInput from "../components/SearchInput";
import CountInfo from "../components/CountInfo";
import HorizontalLine from "../components/HorizontalLine";
import TimeStamp from "../components/TimeStamp";
import ButtonData from "../components/ButtonData";

import "../components/ApiScrollview";

const ViewCopyLists = lazy(() => import("../components/ViewCopyLists"));
const BuyACoffee = lazy(() => import("../components/BuyACoffee"));

function Participants() {
  const {
    handleInvokeApi,
    participantsMutable,
    participantsNonMutable,
    setParticipantsMutable,
    isRenderable,
    isUndoDeleteButtonDisabled,
    setIsUndoDeleteButtonDisabled,
    retrieveDate,
  } = useContext(ParticipantContext);

  // MARK HANLDERS
  const checkHandler = (event) => {
    //todo
    let targetId = event.currentTarget.getAttribute("data-participantid");
    let targetColor = event.currentTarget.getAttribute("data-color");
    const targetElement = document.querySelector(
      `[data-participantid="${targetId}"]`
    );

    targetColor === "gray"
      ? targetElement.setAttribute(
          "style",
          "color: green; position: absolute; right: 60px; top: 11px; transform: scale(1.3); "
        )
      : targetElement.setAttribute(
          "style",
          "color: gray; position: absolute; right: 60px; top: 11px; "
        );

    targetColor === "gray"
      ? targetElement.setAttribute("data-color", "green")
      : targetElement.setAttribute("data-color", "gray");

    const prevElement = targetElement.parentElement.querySelectorAll("svg")[1];
    prevElement.setAttribute("data-color", "gray");
    prevElement.setAttribute(
      "style",
      "color: gray; position: absolute; right: 40px; top: 11px; "
    );
  };

  const xMarkHandler = (event) => {
    //todo
    let targetId = event.currentTarget.getAttribute("data-participantid");
    let targetColor = event.currentTarget.getAttribute("data-color");
    const targetElement = document.querySelector(
      `[data-participantid="${targetId}"]`
    );

    targetColor === "gray"
      ? targetElement.setAttribute(
          "style",
          "color: red; position: absolute; right: 40px; top: 11px; transform: scale(1.3); "
        )
      : targetElement.setAttribute(
          "style",
          "color: gray; position: absolute; right: 40px; top: 11px; "
        );

    targetColor === "gray"
      ? targetElement.setAttribute("data-color", "red")
      : targetElement.setAttribute("data-color", "gray");

    const prevElement = targetElement.parentElement.querySelectorAll("svg")[0];
    prevElement.setAttribute("data-color", "gray");
    prevElement.setAttribute(
      "style",
      "color: gray; position: absolute; right: 60px; top: 11px; "
    );
  };

  // DELETE HANLDERS
  const deleteParticipantHandler = (event) => {
    let targetId = event.currentTarget.getAttribute("data-participantid");

    const updatedParticipantData = participantsMutable.filter(
      ({ participantId }) => {
        return targetId !== participantId;
      }
    );
    setParticipantsMutable(updatedParticipantData);
    setIsUndoDeleteButtonDisabled(false);
  };

  const revertDeletedParticipantHandler = () => {
    setParticipantsMutable(participantsNonMutable);
    setIsUndoDeleteButtonDisabled(true);
  };

  // SEARCH HANDLERS
  const searchHandler = (e) => {
    let searchBoxValue = e.target?.value?.toLowerCase();

    const searchResultsParticipants = participantsNonMutable?.filter(
      ({ screenName }) => {
        if (searchBoxValue === "") {
          return screenName;
        } else {
          return screenName.toLowerCase().includes(searchBoxValue);
        }
      }
    );

    setParticipantsMutable(searchResultsParticipants);
    setIsUndoDeleteButtonDisabled(true);
  };

  const clearSearchHandler = () => {
    //todo is it working
    let searchInputText = document.getElementById("api-scrollview-input");
    searchInputText.value = null;
    setParticipantsMutable(participantsNonMutable);
  };

  return (
    <div className="api-scrollview">
      <HorizontalLine height="5px" backgroundColor="#0d6efd" />
      <HorizontalLine height="15px" backgroundColor="#ffdc03" />
      <HorizontalLine height="15px" backgroundColor="#fedd00" />

      <section style={{ display: "flex", width: "300px" }}>
        <CountInfo
          contentDescription="Participants"
          contentLength={
            participantsNonMutable?.length === 0
              ? "..."
              : participantsNonMutable?.length?.toLocaleString()
          }
          spanLeft="98px"
        />
        <CountInfo
          contentDescription="Filtered"
          contentLength={
            participantsMutable?.length
              ? participantsMutable.length.toLocaleString()
              : "..."
          }
          spanLeft="93px"
        />
      </section>

      <HorizontalLine height="" backgroundColor="#0d6efd" margin="0 0 7px 0" />

      <SearchInput
        onChangeHandler={searchHandler}
        onClickHandlerXmark={clearSearchHandler}
      />

      <AttendeeList
        isRenderable={isRenderable}
        renderList={participantsMutable}
        checkHandler={checkHandler}
        xMarkHandler={xMarkHandler}
        deleteParticipantHandler={deleteParticipantHandler}
        listType=""
      />

      <HorizontalLine backgroundColor="#0d6efd" />

      <TimeStamp retrieveDate={retrieveDate} />

      <HorizontalLine backgroundColor="#0d6efd" margin="0 0 4px 0" />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <ButtonData
          content="Undo Deleted Participants"
          onClickHandler={revertDeletedParticipantHandler}
          isUndoDeleteButtonDisabled={isUndoDeleteButtonDisabled}
        />
        <ButtonData
          content="Refresh Participants"
          onClickHandler={handleInvokeApi}
          isUndoDeleteButtonDisabled={false}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <ViewCopyLists
            allParticipants={participantsNonMutable}
            participantsMutable={participantsMutable}
          />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <BuyACoffee />
        </Suspense>
      </div>
    </div>
  );
}

export default Participants;
