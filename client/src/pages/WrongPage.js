import React from "react";
import { useNavigate } from "react-router-dom";
import wrongPageImg from "../assets/images-avif/404-not-found.avif";

const WrongPage = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/home')}
      // to=""
      style={{ backgroundColor: "white", border: "none" }}
    >
      <img src={wrongPageImg} className="" alt="404 Wrong Page" />
    </button>
  );
};

export default WrongPage;
