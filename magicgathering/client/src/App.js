import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginModal from "./components/Modals/LoginModal";
import { Button } from "react-bootstrap";
import UserPage from "./components/UserPage";
import { sendRequest } from "./endpoints";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [usr, setUsr] = useState(null);
  const [pass, setPass] = useState(null);

  useEffect(() => {
    const user = sendRequest("/users").then((res) => console.log(res));
    setShowLogin(false);
    console.log(user);
    setLoggedUser(user);

    console.log(user);
  });
  /*
  useEffect(() => {
    if (usr !== null && pass !== null) {
      const user = sendRequest(`/api/user/${pass}/${usr}`, "GET");
      setShowLogin(false);
      console.log(user);
      setLoggedUser(user);
    }
  }, [pass, usr]);
*/
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleLogin = (username, password) => {
    const user = sendRequest("/users");
    user.then((res) => console.log(res));
    /* const user = sendRequest(`/api/user/${pass}/${usr}`, "GET");
    setShowLogin(false);
    console.log(user);
    setLoggedUser(user);
    // setUsr(username);
    // setPass(password);*/
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
