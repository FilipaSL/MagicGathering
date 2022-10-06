import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginModal from './components/LoginModal'
import { Button } from 'react-bootstrap'
import UserPage from './components/UserPage';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  const [users, setUsers] = useState(null);
  const [cards, setCards] = useState(null);
  const [collections, setCollections] = useState(null);


  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));

    fetch("/api/cards")
      .then((res) => res.json())
      .then((cards) => setCards(cards));
    
    fetch("/api/collections")
      .then((res) => res.json())
      .then((collections) => setCollections(collections));
  }, []);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleLogin = (username, password) => {
    const data = users.find(user => {
     return  user.userName === username && user.password === password
    });

    if(data){
      setShowLogin(false);
      setLoggedUser(data);
    }
    else{
      setLoginError(true);
    }
  }


  const loginFormProps = {
    show: showLogin,
    handleClose: handleCloseLogin,
    handleShow: handleShowLogin,
    handleLogin,
    loginError
  }

  const userProps = {
    cards,
    collections,
    loggedUser
  }

  const Login = <div>
     <Button variant="primary" onClick={handleShowLogin}>
               Login
        </Button>
      <LoginModal {...loginFormProps}/>
  </div>

  const AppBody = <UserPage {...userProps}></UserPage>
  
  return (
    <div className="App">
      <p className= "appHeader">Magic Gathering Guide</p>
       { loggedUser? AppBody : Login }
    </div>
  );
}

export default App;
