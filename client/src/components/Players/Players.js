import './Players.css';
import { useContext  } from 'react';
import {PlayersContext} from './PlayersContext.js';
import Player from '../Player/Player.js';

export default function Players(){

  const {players} = useContext(PlayersContext);


    return (
        <div className="all-players">
          <div className="container">
            <div className="container-inner">
              {players.length > 0
               ? players.map(player => <Player key={player._id} {...player} />)
              : "LOADING "}
            </div>
          </div>
        </div>
    )
}