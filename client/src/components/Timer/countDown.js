import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const formattedTime = formatTime(seconds);

  return (
    <>
      <span>{formattedTime}</span>
    </>
  );
};

const formatTime = (seconds) => {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })}`;
};

export default CountdownTimer;
