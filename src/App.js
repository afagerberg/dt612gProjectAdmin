//dt162g projekt administration av client Alice Fagerberg HT21
import React, { Component } from "react";

//Import all needed Component for this tutorial
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Pages
import SystemLogin from "./pages";
import AdminPage from "./pages/admin";


class App extends Component {
  
  render() {
    //Kontroll tillåt adminsida om inloggad( Username och Password sparat i local storage)
    if(localStorage.getItem("Username") !== null){
      return (
        <Router>
          <Routes>
              <Route path="/" element={<AdminPage/>}>           
              </Route>       
          </Routes>
      </Router>
      );
    }else {// tillåt inte om ej inloggad (ej sparat i local storage)
      return (
        <Router>
          <Routes>
              <Route path="/" element={<SystemLogin/>}>           
              </Route>
          </Routes>
      </Router>
      );
    }
  }
}

  
export default App; 
