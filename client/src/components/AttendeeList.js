import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AttendeeList({
  isRenderable,
  renderList,
  checkHandler,
  xMarkHandler,
  deleteParticipantHandler,
  listType,
  isDeletable = true,
}) {
  return (
    <div className="attendee-list" style={{ height: "300px" }}>
      {isRenderable ? (
        renderList?.map(({ screenName, participantId }, index) => (
          <div
            className={listType}
            key={participantId}
            style={{ position: "relative", paddingLeft: "10px" }}
          >
            <p
              style={{
                width: "98%",
                cursor: "default",
                borderRadius: "7px",
                textAlign: "left",
                margin: 0,
                padding: "7px 7px 0px 10px",
              }}
            >
              {`${index + 1}) ${screenName}`}
            </p>
            <FontAwesomeIcon
              title="Verified"
              icon="fa-solid fa-check"
              size="lg"
              className=""
              data-participantid={`${participantId - 1000}`}
              data-color={"gray"}
              onClick={checkHandler}
              style={{
                position: "absolute",
                right: isDeletable ? "60px" : "40px",
                top: "11px",
                color: "gray",
              }}
            />
            <FontAwesomeIcon
              title="Not verified"
              icon="fa-solid fa-xmark"
              size="lg"
              data-participantid={`${participantId + 1000}`}
              onClick={xMarkHandler}
              style={{
                position: "absolute",
                right: isDeletable ? "40px" : "18px",
                top: "11px",
                color: "gray",
              }}
            />
            {isDeletable && (
              <FontAwesomeIcon
                title="Delete from list"
                icon="fa-solid fa-trash"
                data-participantid={`${participantId}`}
                onClick={deleteParticipantHandler}
                style={{
                  position: "absolute",
                  right: "18px",
                  top: "13px",
                  color: "gray",
                }}
              />
            )}
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default AttendeeList;
