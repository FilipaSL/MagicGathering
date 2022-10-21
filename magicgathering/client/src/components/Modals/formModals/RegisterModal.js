import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Form } from "react-bootstrap";
import AdaptativeModal from "../AdaptativeModal.js";

function RegisterModal({
  show,
  handleClose,
  handleShow,
  handleRegister,
  registerError,
}) {
  const username = useRef(null);
  const realname = useRef(null);
  const pass = useRef(null);

  const modalTitle = "Register";
  const footer = false;

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    handleRegister(
      username.current.value,
      realname.current.value,
      pass.current.value
    );
  };

  const modalProps = {
    show,
    handleClose,
    handleShow,
    modalTitle,
    footer,
    registerError,
  };

  return (
    <AdaptativeModal {...modalProps}>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username" ref={username} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="realname">
          <Form.Label>Real Name</Form.Label>
          <Form.Control placeholder="Enter your real name" ref={realname} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={pass} />
        </Form.Group>

        {registerError ? (
          <Form.Group className="mb-3" controlId="errorMessage">
            <Form.Text className="text-muted">
              Invalid registry. Try again with different parameters
            </Form.Text>
          </Form.Group>
        ) : (
          <></>
        )}

        <Button variant="primary" type="submit" onClick={handleRegisterSubmit}>
          Register
        </Button>
      </Form>
    </AdaptativeModal>
  );
}

export default RegisterModal;
