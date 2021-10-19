import './App.css';
import React from "react";
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import Nav from './Nav.js';
import HomePage from './HomePage.js';
import ChoosePlayer from './ChoosePlayer.js';
import Canvas from './Canvas.js';


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
              <Canvas />
            </Route>
          </Switch>
      </Router>
    </div>  
  );
}

export default App;
