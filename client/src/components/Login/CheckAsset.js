import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";

import logoCheckmark3 from "../../assets/images/lottie-static-checkmark-offblack2.png";
import logoCheckmarkAnimated from "../../assets/images/lottie-checkmark-offblack.json";

export const CheckAsset = ({ widthArg, heightArg, animate }) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(animate); //Sets state passed from component; false = don't animate; true = animate
    animate && setTimeout(() => {
      setDisplay(false); //Sets state to false to stop animation
    }, 3000);
  }, [animate]);

  const isDisplayed = {
    width: widthArg,
    height: heightArg,
    zIndex: "5",
  };
  
  const isNotDisplayed = {
    display: "none",
  };

  const borderRadius = {
    borderRadius: "50%",
  };
  
  return (
    <>
      <img
        src={logoCheckmark3}
        alt="Attendance Tracker Logo"
        style={display ? isNotDisplayed : { ...isDisplayed, ...borderRadius }}
      ></img>

      <Lottie
        animationData={logoCheckmarkAnimated}
        play
        loop
        speed={0.5}
        alt="Attendance Tracker Animated Logo"
        style={display ? isDisplayed : isNotDisplayed}
      />
    </>
  );
};