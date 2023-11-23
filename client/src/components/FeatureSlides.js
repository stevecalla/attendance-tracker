import { invokeZoomAppsSdk } from "../apis";
import buyCoffee from "./assets/images/bmc-button.png";
import x from "../assets/slides/firstSlide.png";

function FeatureSlide({slidePath, slideTitle, slideAlt }) {
  console.log(slidePath);
  console.log(x);
  return (
      <img 
        // src="../assets/slides/firstSlide.png"
        // src={x}
        src={slidePath}
        title="Click to support my coding with a small donation"
        // src={buyCoffee}
        alt="Buy Me A Coffee to support my coding"

      style={{ 
        width: "80%",
        height: "80%",
        // boxShadow: "0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important", 
      }}/>
      
    //</a>
  );  
}

export default FeatureSlide;