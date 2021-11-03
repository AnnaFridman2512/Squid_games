import './Game.css';
import { animate, motion, useAnimation } from "framer-motion";
import React, {useContext, useEffect, useState, useCallback} from 'react';
import {PlayersContext} from '../Player/PlayersContext.js';





//Anna testing how Player will run 
export default function Game() {
    const controls = useAnimation()
    const {playerNum} = useContext(PlayersContext);
    const [moove, setMoove]= useState(false);
    const [randPosX, setRandPosX] = useState(0);
    const [randPosY, setRandPosY] = useState(0);
    let xRand =  Math.floor(Math.random() * window.screen.width);
    let yTand =  Math.ceil(Math.random() * -(window.screen.height ));

    const startGame = useCallback(
        () => {
            setMoove(true);
            controls.start(i =>({
                x: xRand,
                y: yTand,
                transition: {
                     delay: i * 5,
                    duration: 15 },
              }))
        },[] );

    return (
        <div className="test-game" >
            <button>START GAME</button>
            <motion.div  className="playerInGame" onClick={startGame}  animate={controls}>
                {moove ? playerNum : "works"} 
            </motion.div>

        </div>
    );
}
