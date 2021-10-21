import './Game.css';
import { useContext } from 'react';
import {PlayersContext} from './PlayersContext.js';


//Anna testing how Player will run 

export default function Game() {
    const {playerNum} =useContext(PlayersContext);

    return (
        <div className="game">
            <div className="playerInGame">
            {playerNum}
            </div>
        </div>
    );
}