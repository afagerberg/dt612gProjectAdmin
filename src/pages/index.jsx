//dt162g projekt administration av client Alice Fagerberg HT21

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';




//funktion returnera SystemLogin(inloggningssida) sidans komponenter/funktioner
const SystemLogin = () => {
    
        return (
            <div className="app">
                <Login></Login>
            </div>
        );
    
}

const header = document.getElementById("headnav");

function Login(){


    // States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    header.style.display="none";
    
    const nav = useNavigate();

    
  
    // Användare logininfo
    const database = [
      {
        username: "dreamer1",
        password: "dreampotato123"
      }
    ];
    // Vid error
    const errors = {
      uname: "Fel användarnamn",
      pass: "Fel lösenord"
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      var { uname, pass } = document.forms[0];
  
      // Hitta användarinfo
      const userData = database.find((user) => user.username === uname.value);
  
      // Kontroll jämför användarinfo
      if (userData) {
        if (userData.password !== pass.value) {
          // Vid fel skicka error
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
        // Vid rätt state true, spara i local storage och redirecta till admin
          setIsSubmitted(true);

          localStorage.setItem("Username", "dreamer1");
          localStorage.setItem("Password", "hidden");
        
          nav('/');
          
        }
      } else {
        // Annat fall -not found
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    };
  
    // Generera error message
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
      );
      
  
    //login form
    const renderForm = (
      
      <div className="loginform">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input type="submit" value="Logga in" />
          </div>
        </form>
      </div>
    );
    //Returnera formulär med inställningar
    return ( 
        <div className="loginformbox">
          <h2>Logga in</h2>
                
            {isSubmitted? window.location.reload() :renderForm}

        </div>
    ) 
    
  }

export default SystemLogin;

