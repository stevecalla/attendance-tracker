import React from "react";
import Headerbar from "../components/homeAttendance/Navbar";
import FeaturesCarousel from "../components/homeAttendance/FeaturesCarousel";
import Footer from "../components/homeAttendance/Footer";

export const Home = () => {
  return (
    <>
      <Headerbar />
      <FeaturesCarousel />
      <Footer />
    </>
  );
};

export default Home;
