import './Players.css';
import { useContext } from 'react';
import {PlayersContext} from './PlayersContext.js';
import Player from './Player.js';

export default function Players(){

  const {players} = useContext(PlayersContext);


    return (
        <div className="all-players">
          <div className="container">
            {players.map(player => <Player key={player._id} {...player} />)}
          </div>
        </div>
    )
}