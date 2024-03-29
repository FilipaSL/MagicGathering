import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Form } from "react-bootstrap";
import AdaptativeModal from "../AdaptativeModal.js";

function LoginModal({
  show,
  handleClose,
  handleShow,
  handleLogin,
  loginError,
}) {
  const email = useRef(null);
  const pass = useRef(null);

  const modalTitle = "Login";
  const footer = false;

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    handleLogin(email.current.value, pass.current.value);
  };

  const modalProps = {
    modalTitle,
    show,
    handleClose,
    handleShow,
    handleLogin,
    loginError,
    footer,
  };

  return (
    <AdaptativeModal {...modalProps}>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username" ref={email} />
          <Form.Text className="text-muted">
            Login through real name is not supported as it may not be unique.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={pass} />
        </Form.Group>

        {loginError ? (
          <Form.Group className="mb-3" controlId="errorMessage">
            <Form.Text className="text-muted">
              Invalid Username or Password. Try again.
            </Form.Text>
          </Form.Group>
        ) : (
          <></>
        )}

        <Button variant="primary" type="submit" onClick={handleLoginSubmit}>
          Login
        </Button>
      </Form>
    </AdaptativeModal>
  );
}

export default LoginModal;
