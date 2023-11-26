import Carousel from "react-bootstrap/Carousel";
import firstSlide from "../../assets/slides/firstSlide.png";
import secondSlide from "../../assets/slides/secondSlide.png";
import thirdSlide from "../../assets/slides/thirdSlide.png";

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
      <Carousel
        slide={false}
        variant="dark"
        className="col-12 col-lg-9 d-flex justify-center"
        style={{
          marginTop: "80px",
        }}
      >
        {slides.map((variant, index) => (
          <Carousel.Item key={index}>
            <img
              interval={false}
              className="border rounded"
              src={variant.url}
              title={variant.title}
              alt={variant.alt}
              style={{
                width: "90%",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default FeaturesCarousel;
