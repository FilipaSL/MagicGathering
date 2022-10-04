import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AdaptativeModal from './components/AdaptativeModal/AdaptativeModal';
import { Button, Form } from 'react-bootstrap'

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*
  Para o caso de querermos footer:
    const closeButtonText = "Close";
    const loginButtonText = "Login";
    const footer = true;
  */

  const modalTitle= "Login";
  const footer = false;

  const modalProps = {
    modalTitle,
    //closeButtonText,
    //loginButtonText,
    show,
    handleClose,
    handleShow,
    footer
  } 

  return (
    <div className="App">
        <Button variant="primary" onClick={handleShow}>
              Open Modal
        </Button>
        <AdaptativeModal {...modalProps}>

          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="email" placeholder="Enter username" />
              <Form.Text className="text-muted">
                Login through real name is not supported as it may not be unique. 
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>

        </AdaptativeModal>
    </div>
  );
}

export default App;
