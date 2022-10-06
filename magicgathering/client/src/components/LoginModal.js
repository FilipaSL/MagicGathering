import React, {useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Form } from 'react-bootstrap'
import AdaptativeModal from './AdaptativeModal.js';


function LoginModal(props) {
    /*
    Para o caso de querermos footer:
      const closeButtonText = "Close";
      const loginButtonText = "Login";
      const footer = true;
    */

    
   const email = useRef(null);
   const pass = useRef(null);

  
    const modalTitle= "Login";
    const footer = false;
    
    const handleLoginSubmit = () =>{
        props.handleLogin(email.current.value, pass.current.value)
    }

    const modalProps = {
      modalTitle,
      footer
    } 

    return (
        
        <AdaptativeModal {...props} {...modalProps}>
            <Form>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter username" ref={email} />
                <Form.Text className="text-muted">
                Login through real name is not supported as it may not be unique. 
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref = {pass}/>
            </Form.Group>

            {props.loginError ? 
            <Form.Group className="mb-3" controlId="errorMessage">
                <Form.Text className="text-muted">
                    Invalid Username or Password. Try again.
                </Form.Text>
            </Form.Group>: <></>}
            
            <Button variant="primary" type="submit" onClick={handleLoginSubmit}>
                Login
            </Button>
            </Form>

        </AdaptativeModal>
    );
}

export default LoginModal;
