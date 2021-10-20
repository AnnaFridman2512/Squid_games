import './App.css';
import React, { useContext, useEffect } from "react";
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import Nav from './Nav.js';
import HomePage from './HomePage.js';
import Game from './Game.js';
import Players from './Players';
import {PlayersContext} from './PlayersContext.js';


function App() {

  const {getPlayers} =useContext(PlayersContext);

    useEffect(() => {
        getPlayers();
      }, [])

    
  return (
    <div className="App">
      <Router>
        <Nav /> 
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/players">
              <Players />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
          </Switch>
      </Router>
    </div>  
  );
}

export default App;
