function HorizontalLine({backgroundColor, height, margin}) {
  return (
    <hr
      className="hr-scroll-border"
      style={{
        margin: margin || "0",
        height: height,
        borderRadius: "5px",
        backgroundColor: backgroundColor,
      }}
    >
    </hr>
  );  
}

export default HorizontalLine;