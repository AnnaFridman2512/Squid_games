import './Player.css';
import { useContext } from 'react';
import {PlayersContext} from './PlayersContext.js';

export default function Player({
    _id,
    number,
    image
}){

const {choosePlayer} = useContext(PlayersContext);

    return (
        <div className="player">
            <img src={`api/${image}`} className="player-image" alt="player-img"/>
            <div className="choose-player"> 
            <p className="player-number">Player {number}</p>
            {<button onClick={() => choosePlayer(number)}><span>Choose</span></button>}
            </div>
       </div>
        
    );
}