import Carousel from "react-bootstrap/Carousel";
import FeatureSlide from "./FeatureSlides";
import firstSlide from "../assets/slides/firstSlide.png";
import secondSlide from "../assets/slides/secondSlide.png";
import thirdSlide from "../assets/slides/thirdSlide.png";

function FeaturesCarousel() {
  const slides = [
    {
      url: firstSlide,
      title: "",
      alt: "Attendance tracker features",
    },
    {
      url: secondSlide,
      title: "",
      alt: "Participants tab features",
    },
    {
      url: thirdSlide,
      title: "",
      alt: "Fuzzy logic tab features",
    },
  ];

  return (
    <>
      {
        <Carousel variant="dark" className="m-5">
          {slides.map((slide) => (
            <Carousel.Item>
              <FeatureSlide
                slidePath={slide.url}
                slideTitle={slide.title}
                slideAlt={slide.alt}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      }
    </>
  );
}

export default FeaturesCarousel;
