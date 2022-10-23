import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginModal from "./components/Modals/formModals/LoginModal";
import { Button } from "react-bootstrap";
import loginRequest from "./endpoints/login.endpoint";
import FrontPage from "./components/FrontPage/FrontPage";
import RegisterModal from "./components/Modals/formModals/RegisterModal";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loginInfo, setLoginInfo] = useState(null);

  const [showRegister, setShowRegister] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  useEffect(() => {
    setLoginError(null);
    if (loginInfo) {
      loginRequest
        .loginUser(
          JSON.stringify({
            userName: loginInfo.username,
            password: loginInfo.password,
          })
        )
        .then((res) => {
          if (res.data === null) {
            setLoginError(res.message);
          } else {
            setLoggedUser(res);
          }
        });
    } else {
      setLoggedUser(null);
    }
  }, [loginInfo]);

  const handleLogin = (username, password) => {
    setLoginInfo({ username: username, password: password });
  };

  const handleRegister = (username, realName, password) => {
    if (username && password && realName) {
      loginRequest
        .registerUser(
          JSON.stringify({
            userName: username,
            password: password,
            realName: realName,
            admin: 0,
          })
        )
        .then((data) => {
          const user = data.data;
          if (user) {
            setLoginInfo({ username: user.userName, password: password });
            handleCloseRegister();
          } else {
            setRegisterError(data.message);
          }
        });
    }
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

  const registerFormProps = {
    show: showRegister,
    handleClose: handleCloseRegister,
    handleShow: handleShowRegister,
    handleRegister,
    registerError,
  };

  const userProps = {
    loggedUser,
    handleUserLogout,
  };

  const Login = (
    <div className="login">
      <Button className="buttons" variant="primary" onClick={handleShowLogin}>
        Login
      </Button>
      <Button
        className="buttons"
        variant="primary"
        onClick={handleShowRegister}
      >
        Register
      </Button>
      <LoginModal {...loginFormProps} />
      <RegisterModal {...registerFormProps} />
    </div>
  );

  const AppBody = <FrontPage className="mainPage" {...userProps}></FrontPage>;

  return (
    <div className="App">
      <p className="appHeader">Magic Gathering Guide</p>
      {loggedUser ? AppBody : Login}
    </div>
  );
}

export default App;
