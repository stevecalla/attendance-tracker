import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CountdownTimer from "../Timer/countDown";

function StaticModal() {
  // Modal will not close if you click outside me. Do not even try to press escape key.
  const [show, setShow] = useState(true);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={show}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header closeButton> */}
        <Modal.Header>
          <Modal.Title>Password Reset Expired</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please request another reset if necessary.<br></br> 
          Redirecting to login page.
        </Modal.Body>
        <Modal.Footer>
        Countdown: <CountdownTimer initialSeconds={5} /> seconds
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StaticModal;