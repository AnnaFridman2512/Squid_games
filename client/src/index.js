import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "../src/components/App/App.js";
import PlayersProvider from "../src/components/Players/PlayersContext.js";
//import GameProvider from '../src/components/Game/GameContext.js';

ReactDOM.render(

  <PlayersProvider>
    <App />
  </PlayersProvider>,

  document.getElementById("root")
);
