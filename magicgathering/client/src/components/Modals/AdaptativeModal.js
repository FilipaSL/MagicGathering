import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, Button } from "react-bootstrap";

function AdaptativeModal({
  handleClose,
  handleSave,
  show,
  modalTitle,
  footer,
  children,
}) {
  if (footer) {
    footer = (
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    );
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer}
    </Modal>
  );
}

export default AdaptativeModal;
