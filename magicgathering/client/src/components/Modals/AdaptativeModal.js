import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, Button, Form } from "react-bootstrap";

function AdaptativeModal({
  handleClose,
  handleSave,
  error,
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
      <Modal.Body>
        {error ? (
          <Form.Group className="mb-3" controlId="errorMessage">
            <Form.Text className="text-muted">{error}</Form.Text>
          </Form.Group>
        ) : (
          <></>
        )}
        {children}
      </Modal.Body>
      {footer}
    </Modal>
  );
}

export default AdaptativeModal;
