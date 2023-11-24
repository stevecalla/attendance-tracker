import Carousel from "react-bootstrap/Carousel";
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
        <Carousel
          slide={false}
          variant="dark"
          className="m-lg-4 w-80 h-50"
        >
          {slides.map((slide) => (
            <Carousel.Item>
              <img
                className="border rounded"
                src={slide.url}
                title={slide.title}
                alt={slide.alt}
                style={{
                  width: "85%",
                  // height: "50%",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      }
    </>
  );
}

export default FeaturesCarousel;
