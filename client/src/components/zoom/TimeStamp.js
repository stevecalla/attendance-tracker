import React, { useState, useEffect } from "react";
import { getDate, getTime } from "../../utils/dateInfo";

const TimeStamp = ({ retrieveDate }) => {
  console.log(retrieveDate);

  const [dateStamp, setDateStamp] = useState("");
  const [timeStamp, setTimeStamp] = useState("");

  useEffect(() => {
    setDateStamp(getDate());
    setTimeStamp(getTime());
  }, [getDate, getTime, retrieveDate]);

  return (
    <p
      title="Timestamp when data was refreshed"
      style={{ margin: "0", width: "300px", textAlign: "center" }}
    >
      {`${dateStamp} ${timeStamp}`}
    </p>
  );
}

export default TimeStamp;
