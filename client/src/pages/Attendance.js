import React, { useState, useEffect, Suspense, lazy, useContext } from "react";
import { ParticipantContext } from "./MainPortal";

import AttendeeList from "../components/AttendeeList";
import CountInfo from "../components/CountInfo";
import HorizontalLine from "../components/HorizontalLine";
import TimeStamp from "../components/TimeStamp";
import ButtonData from "../components/ButtonData";
import AttendeeInput from "../components/AttendeeInput";

import { sortHandlerNames } from "../utils/sort";
import { handleSimilarityScores } from "../utils/similarityScoring";
import { setStorage, retrieveStorage } from "../utils/storage";
import { cipherText, decryptText } from "../utils/encrypt";

import "../components/ApiScrollview";

const ViewCopyLists = lazy(() => import("../components/ViewCopyLists"));
const BuyACoffee = lazy(() => import("../components/BuyACoffee"));

function Attendance() {
  const {
    handleInvokeApi,
    participantsMutable,
    participantsNonMutable,
    isRenderable,
    retrieveDate,
  } = useContext(ParticipantContext);
  const [isSubmitIconDisplayable, setIsSubmitIconDisplayable] = useState(false);
  const [isRetrieveIconDiplayable, setIsRetrieveIconDisplayable] =
    useState(false);

  // const [ attendeeRoster, setAttendeeRoster] = useState(["steve calla", "b", "c", "d", "alex jones", "f", ]);
  const [attendeeRoster, setAttendeeRoster] = useState([]);
  const [matchResults, setMatchResults] = useState([]);
  const [presentResults, setPresentResults] = useState([]);
  const [absentResults, setAbsentResults] = useState([]);

  //SIMILARITY SCORING
  useEffect(() => {
    markAttendance();
    /* eslint-disable */
  }, [attendeeRoster]);

  // set presentResults & absentResults;
  useEffect(() => {
    if (matchResults.length) {
      setPresentResults(
        matchResults.filter(({ maxSimilarity }) => maxSimilarity > 0.5)
      );
      setAbsentResults(
        matchResults.filter(({ maxSimilarity }) => maxSimilarity <= 0.5)
      );
    }
  }, [attendeeRoster, matchResults]);

  // DISPLAY RETRIEVE ICON
  useEffect(() => {
    displayRetrieveIcon();
  }, []);

  // MARK HANLDERS
  const checkHandler = (event) => {
    //todo
    let targetId = event.currentTarget.getAttribute("data-participantid");

    let targetColor = event.currentTarget.getAttribute("data-color");
    const targetElement = document.querySelector(
      `[data-participantid="${targetId}"]`
    );

    targetColor === "gray" &&
      targetElement.setAttribute(
        "style",
        "color: green; position: absolute; right: 40px; top: 11px; transform: scale(1.3); "
      );
    // : targetElement.setAttribute(
    //     "style",
    //     "color: gray; position: absolute; right: 40px; top: 11px; "
    //   );

    targetColor === "gray"
      ? targetElement.setAttribute("data-color", "green")
      : targetElement.setAttribute("data-color", "gray");

    const prevElement = targetElement.parentElement.querySelectorAll("svg")[1];
    prevElement.setAttribute("data-color", "gray");
    prevElement.setAttribute(
      "style",
      "color: gray; position: absolute; right: 18px; top: 11px; "
    );

    let targetIndex = 1000 + parseInt(targetId);
    const updatedMatchResults = matchResults.map((result, index) => {
      let newValue = 1;

      if (index === targetIndex) {
        return {
          ...result,
          maxSimilarity: newValue,
        };
      } else {
        return result;
      }
    });

    setMatchResults(updatedMatchResults);
  };

  const xMarkHandler = (event) => {
    //todo
    let targetId = event.currentTarget.getAttribute("data-participantid");
    let targetColor = event.currentTarget.getAttribute("data-color");
    const targetElement = document.querySelector(
      `[data-participantid="${targetId}"]`
    );

    targetColor === "gray" &&
      targetElement.setAttribute(
        "style",
        "color: red; position: absolute; right: 18px; top: 11px; transform: scale(1.3); "
      );
    // : targetElement.setAttribute(
    //     "style",
    //     "color: gray; position: absolute; right: 18px; top: 11px; "
    //   );

    targetColor === "gray"
      ? targetElement.setAttribute("data-color", "red")
      : targetElement.setAttribute("data-color", "gray");

    const prevElement = targetElement.parentElement.querySelectorAll("svg")[0];
    prevElement.setAttribute("data-color", "gray");
    prevElement.setAttribute(
      "style",
      "color: gray; position: absolute; right: 40px; top: 11px; "
    );

    let targetIndex = parseInt(targetId) - 1000;
    const updatedMatchResults = matchResults.map((result, index) => {
      let newValue = 0;

      if (index === targetIndex) {
        return {
          ...result,
          maxSimilarity: newValue,
          test: "test",
        };
      } else {
        return result;
      }
    });

    setMatchResults(updatedMatchResults);
  };

  //TODO
  // ATTENDEE FUNCTIONS
  const handleAttendeeInput = () => {
    const textInput = document.getElementById("attendeeInput").value;
    console.log(textInput);

    const attendeeTextInput = textInput.split(";"); //spit to array
    let sortedAttendees = sortHandlerNames(attendeeTextInput); //sort array
    const attendees = sortedAttendees.map((name, index) => {
      // console.log(name);
      // isNaN(name) ? name = name.trim() : name;
      name = String(name).trim();
      return {
        participantId: index,
        screenName: name,
      };
    });
    setAttendeeRoster(attendees);
    clearIconColor();
  };

  const clearIconColor = () => {
    let attendanceRosterDivs = document.querySelectorAll(".attendance-roster");

    attendanceRosterDivs.forEach((attendanceRosterDiv, i) => {
      const svgElements = attendanceRosterDiv.querySelectorAll("svg");

      if (svgElements.length >= 1) {
        const firstSVGElement = svgElements[0];
        const secondSvgElement = svgElements[1];

        firstSVGElement.setAttribute("data-color", "gray");
        secondSvgElement.setAttribute("data-color", "gray");

        firstSVGElement.setAttribute(
          "style",
          "color: gray; position: absolute; right: 40px; top: 11px; "
        );

        secondSvgElement.setAttribute(
          "style",
          "color: gray; position: absolute; right: 18px; top: 11px; "
        );
      }
    });
  };

  // STORAGE - SAVE & GET
  const handleSaveStorage = () => {
    const attendeeInput = document.getElementById("attendeeInput").value;

    const attendeeCipher = cipherText(attendeeInput);

    setStorage(attendeeCipher);

    setIsRetrieveIconDisplayable(true);
  };

  const handleRetrieveStorage = () => {
    const storedAttendeeList = retrieveStorage(); // get data from storage

    let input = document.getElementById("attendeeInput"); // target textarea
    input.value = ""; // clear textarea to prevent duplicates / old values

    // input.setRangeText(storedAttendeeList); // populate input with storedAttendeeList
    input.setRangeText(decryptText(storedAttendeeList)); // decrypt

    // trigger onChangeEvent to display save & submit icons
    let triggerOnChangeEvent = new Event("change", { bubbles: true });
    input.dispatchEvent(triggerOnChangeEvent);

    //https://github.com/facebook/react/issues/11488
    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setRangeText
  };

  const displayRetrieveIcon = () => {
    let isLocalStoragePopulated = retrieveStorage();
    console.log(isLocalStoragePopulated);

    if (isLocalStoragePopulated) {
      setIsRetrieveIconDisplayable(true);
    } else {
      setIsRetrieveIconDisplayable(false);
    }
  };

  // MARK ATTENDANCE
  const markAttendance = async () => {
    //todo refactor
    let scores = [];
    setTimeout(() => {
      scores = getMatchScores();
    }, 1000);

    setTimeout(() => {
      setIconStyle(scores);
    }, 3000);
  };

  const getMatchScores = () => {
    let scores = [];
    scores = handleSimilarityScores(attendeeRoster, participantsNonMutable);

    setMatchResults(
      scores.map((match) => {
        console.log(match);
        return {
          matchResults,
          index: match.index,
          attendeeName: match.attendeeName,
          participantId: match.participantId,
          matchName: match.matchName,
          maxSimilarity: match.maxSimilarity,
        };
      })
    );

    return scores;
  };

  const setIconStyle = (scores) => {
    let attendanceRosterDivs = document.querySelectorAll(".attendance-roster");
    console.log(attendanceRosterDivs);

    attendanceRosterDivs.forEach((attendanceRosterDiv, i) => {
      const svgElements = attendanceRosterDiv.querySelectorAll("svg");

      console.log(svgElements);

      if (svgElements.length >= 1) {
        const firstSVGElement = svgElements[0];
        const secondSvgElement = svgElements[1];

        if (scores?.length >= 1 && parseFloat(scores[i]?.maxSimilarity) > 0.5) {
          console.log("yes");

          firstSVGElement.setAttribute("data-color", "green");
          secondSvgElement.setAttribute("data-color", "gray");

          firstSVGElement.setAttribute(
            "style",
            "color: green; position: absolute; right: 40px; top: 11px; transform: scale(1.3); "
          );

          secondSvgElement.setAttribute(
            "style",
            "color: gray; position: absolute; right: 18px; top: 11px; "
          );
        } else if (scores.length >= 1) {
          console.log("no");

          secondSvgElement.setAttribute("data-color", "red");
          firstSVGElement.setAttribute("data-color", "gray");

          secondSvgElement.setAttribute(
            "style",
            "color: red; position: absolute; right: 18px; top: 11px; transform: scale(1.3); "
          );

          firstSVGElement.setAttribute(
            "style",
            "color: gray; position: absolute; right: 40px; top: 11px; "
          );
        } else {
          console.log(scores[i]);
        }
      }
    });
  };

  //TODO END

  return (
    <div className="" style={{ width: "300px" }}>
      <HorizontalLine height="5px" backgroundColor="#0d6efd" />
      <HorizontalLine height="15px" backgroundColor="#ffdc03" />

      <section style={{ display: "flex", width: "300px" }}>
        <CountInfo
          contentDescription="Participants"
          contentLength={
            participantsNonMutable?.length === 0
              ? "..."
              : participantsNonMutable.length.toLocaleString()
          }
          spanLeft="98px"
        />
        <CountInfo
          contentDescription="Roster"
          contentLength={
            matchResults?.length ? matchResults.length.toLocaleString() : "..."
          }
          spanLeft="93px"
        />
      </section>
      <section style={{ display: "flex", width: "300px" }}>
        <CountInfo
          contentDescription="Present"
          contentLength={
            presentResults?.length
              ? presentResults.length.toLocaleString()
              : "..."
          }
          spanLeft="98px"
        />
        <CountInfo
          contentDescription="Absent"
          contentLength={
            absentResults?.length
              ? absentResults.length.toLocaleString()
              : "..."
          }
          spanLeft="93px"
        />
      </section>

      <HorizontalLine height="" backgroundColor="#0d6efd" margin="0 0 7px 0" />

      <AttendeeInput
        handleAttendeeInput={handleAttendeeInput}
        isSubmitIconDisplayable={isSubmitIconDisplayable}
        setIsSubmitIconDisplayable={setIsSubmitIconDisplayable}
        handleSaveStorage={handleSaveStorage}
        handleRetrieveStorage={handleRetrieveStorage}
        isRetrieveIconDiplayable={isRetrieveIconDiplayable}
        setIsRetrieveIconDisplayable={setIsRetrieveIconDisplayable}
      />

      <AttendeeList
        isRenderable={isRenderable}
        renderList={attendeeRoster}
        checkHandler={checkHandler}
        xMarkHandler={xMarkHandler}
        listType="attendance-roster"
        isDeletable={false}
      />

      <HorizontalLine backgroundColor="#0d6efd" />

      <TimeStamp retrieveDate={retrieveDate} />

      <HorizontalLine backgroundColor="#0d6efd" margin="0 0 4px 0" />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <ButtonData
          content="Refresh Participants"
          onClickHandler={handleInvokeApi}
          isDisabled={false}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <ViewCopyLists
            allParticipants={participantsNonMutable}
            participantsMutable={participantsMutable}
            matchResults={matchResults}
            tabView="attendance"
          />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <BuyACoffee />
        </Suspense>
      </div>
    </div>
  );
}

export default Attendance;
