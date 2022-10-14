import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginModal from "./components/Modals/LoginModal";
import { Button } from "react-bootstrap";
import UserPage from "./components/UserPage";
import userRequests from "./endpoints/users.endpoint";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [usr, setUsr] = useState("teste2");
  const [pass, setPass] = useState("asd");

  /*useEffect(() => {
    if (usr && pass)
      userRequests
        .loginUser(JSON.stringify({ userName: usr, password: pass }))
        .then((res) => console.log(res));
  }, [usr, pass]);
*/
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleLogin = (username, password) => {
    userRequests
      .loginUser(JSON.stringify({ userName: username, password: password }))
      .then((res) => setLoggedUser(res));
  };

  const loginFormProps = {
    show: showLogin,
    handleClose: handleCloseLogin,
    handleShow: handleShowLogin,
    handleLogin,
    loginError,
  };

  const userProps = {
    loggedUser,
  };

  const Login = (
    <div>
      <Button variant="primary" onClick={handleShowLogin}>
        Login
      </Button>
      <LoginModal {...loginFormProps} />
    </div>
  );

  const AppBody = <UserPage {...userProps}></UserPage>;

  return (
    <div className="App">
      <p className="appHeader">Magic Gathering Guide</p>
      {loggedUser ? AppBody : Login}
    </div>
  );
}

export default App;
