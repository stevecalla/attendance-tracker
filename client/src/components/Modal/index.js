import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalTemplate({ modalContent, resetModal }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* LAUNCH MODAL BUTTON FOR TESTING */}
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} onClick={resetModal}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Update Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent.shortMessage}
          <br />
          {modalContent.message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTemplate;
