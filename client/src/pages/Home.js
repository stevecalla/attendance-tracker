import React from "react";
import Headerbar from "../components/homeAttendance/Navbar";
import FeaturesCarousel from "../components/homeAttendance/FeaturesCarousel";
import Footer from "../components/homeAttendance/Footer";
// import FooterCopy from "../components/homeAttendance/FooterCopy";


export const Home = () => {
  return (
    // <p>Hello</p>
    <>
      <Headerbar />
      <FeaturesCarousel />
      {/* <FeaturesCarousel /> */}
      {/* <FooterCopy /> */}
      <Footer />
    </>
  );
};

export default Home;
