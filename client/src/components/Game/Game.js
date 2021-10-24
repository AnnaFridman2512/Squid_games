import './Game.css';
import React, {useContext, useEffect} from 'react';
import {PlayersContext} from '../Player/PlayersContext.js';


//Anna testing how Player will run 
export default function Game() {
    const {playerNum} = useContext(PlayersContext);

    useEffect(()=> {
        

    }, [])

    return (
        <div className="test-game">
            <div  className="playerInGame">
                {playerNum} 
            </div>

        </div>
    );
}