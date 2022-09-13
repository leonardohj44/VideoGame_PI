import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
//import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Create from "./components/Create/Create"
import Details from './components/Details/Details'

function App() {
  return (
    <BrowserRouter>
      <Route exact path= "/" component= {LandingPage}/>
      <Route exact path= "/home" component= {Home}/>
      <Route exact path= "/videogames" component= {Create}/>
      <Route exact path= "/videogame/:id" component= {Details}/>
    </BrowserRouter>
  );
}

export default App;

