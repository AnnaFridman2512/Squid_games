import './App.css';
import React, { useContext, useEffect } from "react";
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import Nav from '../Nav/Nav.js';
import HomePage from '../HomePage/HomePage.js';
import Game from '../Game/Game.js';
import Players from '../Players/Players.js';
import Doll from '../Doll/Doll.js';
import {PlayersContext} from '../Player/PlayersContext.js';
import RedLIghtGreenLight from '../RedLIghtGreenLight/RedLightGreenLight.js';



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
            <Route path="/doll">
              <Doll />
            </Route>
            <Route path="/players">
              <Players />
            </Route>
            <Route path="/Test">
              <Game />
            </Route>
            <Route path="/redLightGreenLight">
              <RedLIghtGreenLight />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
