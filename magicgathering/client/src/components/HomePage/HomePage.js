import React, { useState, useEffect } from "react";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import LoginModal from "../Modals/formModals/LoginModal";
import { Button } from "react-bootstrap";
import loginRequest from "../../endpoints/login.endpoint";
import RegisterModal from "../Modals/formModals/RegisterModal";
import AlertBar from "../AlertBar/AlertBar";

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginInfo, setLoginInfo] = useState(null);

  const [registerAlert, setRegisterAlert] = useState(false);
  const [registerAlertProps, setRegisterAlertProps] = useState(null);

  const [showRegister, setShowRegister] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const navigate = useNavigate();

  const handleCloseLogin = () => {
    setLoginError(null);
    setShowLogin(false);
  };
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseRegister = () => {
    setRegisterError(null);
    setShowRegister(false);
  };

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
            navigate("/home", { replace: true, state: res });
          }
        });
    }
  }, [loginInfo, navigate]);

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
            setRegisterAlertProps({
              handleClose: () => {
                setRegisterAlert(false);
                setRegisterAlertProps(null);
              },
              message: "User registered! You can login!",
              variant: "success",
            });
            setRegisterAlert(true);

            //setLoginInfo({ username: user.userName, password: user.password });
            handleCloseRegister();
          } else {
            setRegisterError(data.message);
          }
        })
        .catch((error) => setRegisterError("Error registering. Try again."));
    } else {
      setRegisterError("Empty values are not allowed.");
    }
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

  return (
    <div className="App" href="/start">
      <p className="appHeader">Magic Gathering Guide</p>
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
        {registerAlert ? <AlertBar {...registerAlertProps} /> : <></>}
        <RegisterModal {...registerFormProps} />
      </div>
    </div>
  );
}
export default HomePage;
