import Carousel from 'react-bootstrap/Carousel';
import FeatureSlide from "./FeatureSlides";
import FirstSlide from "../assets/slides/firstSlide.png";
import SecondSlide from "../assets/slides/firstSlide.png";
import ThirdSlide from "../assets/slides/firstSlide.png";

function FeaturesCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <FeatureSlide 
          slidePath={FirstSlide}
          slideTitle=""
          slideAlt="" 
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <FeatureSlide 
          slidePath={FirstSlide}
          slideTitle=""
          slideAlt="" 
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <FeatureSlide 
          slidePath={FirstSlide}
          slideTitle=""
          slideAlt="" 
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default FeaturesCarousel;