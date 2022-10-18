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
  const [loginInfo, setLoginInfo] = useState(null);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  useEffect(() => {
    if (loginInfo) {
      userRequests
        .loginUser(
          JSON.stringify({
            userName: loginInfo.username,
            password: loginInfo.password,
          })
        )
        .then((res) => {
          setLoggedUser(res);
        });
    } else {
      setLoggedUser(null);
    }
  }, [loginInfo]);

  const handleLogin = (username, password) => {
    setLoginInfo({ username: username, password: password });
  };

  const handleUserLogout = () => {
    setLoginInfo(null);
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
    handleUserLogout,
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
