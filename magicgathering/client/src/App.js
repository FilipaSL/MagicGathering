import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginModal from './components/Modals/LoginModal'
import { Button } from 'react-bootstrap'
import UserPage from './components/UserPage';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [usr, setUsr] = useState(null);
  const [pass, setPass] = useState(null);

  useEffect(() => {
    if(usr!== null && pass !== null){
      fetch(`/user/${pass}/${usr}`)
      .then((res) => res.json())
      .then((user) =>{
        setShowLogin(false);
        setLoggedUser(user)}
        )
      .catch(
          (error) => {
            console.log(error);
            setLoginError(error);
          })
    }
    
  }, [pass, usr]);

   /* fetch("/api/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));

    fetch("/api/cards")
      .then((res) => res.json())
      .then((cards) => setCards(cards));
    
    fetch("/api/collections")
      .then((res) => res.json())
      .then((collections) => setCollections(collections));
*/

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleLogin = (username, password) => {
    setUsr(username);
    setPass(password);
  }


  const loginFormProps = {
    show: showLogin,
    handleClose: handleCloseLogin,
    handleShow: handleShowLogin,
    handleLogin,
    loginError
  }

  const userProps = {
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
       { loggedUser ? AppBody : Login }
    </div>
  );
}

export default App;
