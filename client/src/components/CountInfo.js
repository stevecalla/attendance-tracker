import Button from "react-bootstrap/Button";

function CountInfo({ contentDescription, contentLength, spanLeft = "267px" }) {
  return (
    <p
      style={{
        position: "relative",
        margin: "0",
        width: "200px",
        paddingLeft: "5px",
      }}
    >
      {`${contentDescription}:`}
      <span
        style={{
          position: "absolute",
          width: "50px",
          textAlign: "right",
          left: spanLeft,
        }}
      >
        {contentLength}
      </span>
    </p>
  );
}

export default CountInfo;
