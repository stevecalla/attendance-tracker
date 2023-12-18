import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";

import logoCheckmark3 from "../../assets/images/lottie-static-checkmark-offblack2.png";
import logoCheckmarkAnimated from "../../assets/images/lottie-checkmark-offblack.json";

export const CheckAsset = ({widthArg, heightArg}) => {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 3000);
  }, []);

  const isDisplayed = {
    width: widthArg,
    height: heightArg,
    backgroundColor: "#2B3035",
    zIndex: "5",
  };
  
  const borderRadius = {
    borderRadius: "50%",
  };
  
  const isNotDisplayed = {
    display: "none",
  };
  

  return (
    <>
      <img
        src={logoCheckmark3}
        alt="Pristine clean"
        style={display ? isNotDisplayed : { ...borderRadius, ...isDisplayed }}
      ></img>

      <Lottie
        animationData={logoCheckmarkAnimated}
        play
        loop
        speed={0.5}
        alt="Attendance Tracker"
        style={display ? isDisplayed : isNotDisplayed}
      />
    </>
  );
};