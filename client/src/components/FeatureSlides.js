function FeatureSlide({ slidePath, slideTitle, slideAlt }) {
  return (
    <img
      className="border rounded"
      src={slidePath}
      title={slideTitle}
      alt={slideAlt}
      style={{
        width: "90%",
        height: "80%",
      }}
    />
  );
}

export default FeatureSlide;
