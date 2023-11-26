import Button from "react-bootstrap/Button";

function ButtonData({content, onClickHandler, isUndoDeleteButtonDisabled}) {
  
  return (
    <Button
      onClick={onClickHandler}
      disabled={isUndoDeleteButtonDisabled}
      style={{ width: "300px", height: "38px" }}
    >
      {content}
    </Button>
  );  
}

export default ButtonData;