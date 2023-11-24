import "../styles/spinner.css";

function Spinner({ content, onClickHandler, isDisabled }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "300px",
        height: "200px",
      }}
    >
      <div className="lds-hourglass"></div>
    </div>
  );
}

export default Spinner;
