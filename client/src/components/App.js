import './App.css';
import React from "react";
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import Nav from './Nav.js';
import HomePage from './HomePage.js';
import ChoosePlayer from './ChoosePlayer.js';
import Game from './Game.js';


function App() {
  return (
    <div className="App">
      <Router>
        <Nav /> 
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="choosePlayer">
              <ChoosePlayer />
            </Route>
            <Route path="Canvas">
              <Game />
            </Route>
          </Switch>
      </Router>
    </div>  
  );
}

export default App;
