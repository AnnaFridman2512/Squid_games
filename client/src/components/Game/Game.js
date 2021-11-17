import "./Game.css";
import soundEffect from "./soundEffect.mp3";
import React, { useContext, useEffect, useState, useRef } from "react";
import { PlayersContext } from "../Player/PlayersContext.js";
import { motion } from "framer-motion";
import Doll from "./../Doll/Doll";
import Npc from "./Npc";

const CHANGE_TIME = 5000;
const TOTAL_TIME = 60000;
let greenLightInterval, timeRemainingInterval, gameOverInterval;

const playAudio = () => {
  document.querySelector("audio").play();
};

//Anna testing how Player will run
export default function Game() {
  const { playerNum, players } = useContext(PlayersContext);
  const playerRef = useRef(null);
  const soundEffectRef = useRef(null);

  const [moove, setMoove] = useState(false);
  const [checkForCoveringNpcs, setCheckForCoveringNpcs] = useState(false);
  const [coveringNpcs, setCoveringNpcs] = useState(0);
  const [translateXPlayer, setTranslateXPlayer] = useState(0);
  const [translateYPlayer, setTranslateYPlayer] = useState(0);

  const [gameIsOn, setGameIsOn] = useState(false);
  const [resetPosition, setResetPosition] = useState(false);

  const [greenLight, setGreenLight] = useState(true);
  const [warning, setWarning] = useState(false);

  const [Keys, setKeys] = useState([]);

  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME / 1000);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const playGreenLightSound = () => {
      let i = 0;
      playAudio();
      const playInterval = setInterval(() => {
        if (i++ % 2 === 1) {
          playAudio();
        }
        if (i > TOTAL_TIME / CHANGE_TIME) clearInterval(playInterval);
      }, CHANGE_TIME);
    };
    document
      .getElementById("startGame")
      .addEventListener("click", playGreenLightSound);
  }, []);

  useEffect(() => {
    //check for win
    if (gameIsOn) {
      if (translateYPlayer <= -(window.innerHeight * 0.93 - 150)) {
        setMessage("🏆 WIN");
        setGameIsOn(false);
      }
    }
  }, [translateXPlayer, translateYPlayer, gameIsOn]);

  useEffect(() => {
    setTranslateXPlayer(0);
    setTranslateYPlayer(0);
  }, [resetPosition]);

  useEffect(() => {
    //Fail check
    if (timeRemaining === 0 && gameIsOn) {
      return gameOver();
    }
    if (gameIsOn && timeRemaining > 0 && !greenLight && moove) {
      setCoveringNpcs(0);
      setCheckForCoveringNpcs((prev) => !prev);
    }
  }, [greenLight, timeRemaining, moove, gameIsOn]);

  useEffect(() => {
    const movePlayerByKeyboard = (e) => {
      if (e.keyCode === 37) setTranslateYPlayer((prev) => prev - 1);
      if (e.keyCode === 39) setTranslateXPlayer((prev) => prev + 1);
      if (e.keyCode === 38) setTranslateYPlayer((prev) => prev - 1);
      if (e.keyCode === 40) setTranslateYPlayer((prev) => prev + 1);

      if (
        e.keyCode === 40 ||
        e.keyCode === 39 ||
        e.keyCode === 38 ||
        e.keyCode === 37
      )
        setMoove(true);
    };
    if (gameIsOn) {
      window.addEventListener("keydown", movePlayerByKeyboard);
    } else {
      window.removeEventListener("keydown", movePlayerByKeyboard);
    }

    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      Keys[e.keyCode] = false;

      setMoove(Keys.reduce((allKeysUp, key) => !key && allKeysUp, true));
    });
  }, [gameIsOn]);

  useEffect(() => {
    if (coveringNpcs > 0) clearInterval(gameOverInterval);
    if (gameIsOn && moove && !greenLight && coveringNpcs === 0) {
      gameOverInterval = setInterval(gameOver, 166);
    }
  }, [coveringNpcs, gameIsOn, moove, greenLight]);

  useEffect(() => {
    return () => {
      clearInterval(timeRemainingInterval);
      clearInterval(greenLightInterval);
      clearInterval(gameOverInterval);
    };
  }, []);

  const startGame = () => {
    setMoove(false);
    setCheckForCoveringNpcs(false);
    setCoveringNpcs(0);
    setGreenLight(true);
    setWarning(false);
    setMessage("");
    setResetPosition((prev) => !prev);
    setGameIsOn(true);
    startGreenLightRedLight();
    startTimer();
  };

  const startTimer = () => {
    setTimeRemaining(TOTAL_TIME / 1000);
    timeRemainingInterval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);
  };

  const startGreenLightRedLight = () => {
    setGreenLight(true);
    setWarning(false);
    greenLightInterval = setInterval(() => {
      if (greenLight) {
        //Goes red
        setTimeout(() => {
          setGreenLight((prev) => !prev);
          setWarning((prev) => !prev);
        }, 333);
        setWarning((prev) => !prev);
      } else {
        setGreenLight((prev) => !prev);
      }
    }, CHANGE_TIME);
  };

  //NPC FUNCATIONALLITY
  const killNpc = (npcNumber) => {};

  const checkCollision = (npcBounderies) => {
    if (!npcBounderies) return;
    const playerBounderies = playerRef.current.getBoundingClientRect();
    const playerMeetsNpcFromLeftOrRight =
      +Math.abs(playerBounderies.top - npcBounderies.top) <
      npcBounderies.height;
    const playerMeetsNpcFromTopOrBottom =
      +Math.abs(playerBounderies.left - npcBounderies.left) <
      npcBounderies.width;

    //  if(playerMeetsNpcFromTopOrBottom && playerMeetsNpcFromLeftOrRight && playerBounderies.top>npcBounderies.top) return setPreventUp(true);
    //   if(playerMeetsNpcFromTopOrBottom && playerMeetsNpcFromLeftOrRight && playerBounderies.top<npcBounderies.top) return setPreventDown(true);
    //   if(playerMeetsNpcFromTopOrBottom && playerMeetsNpcFromLeftOrRight && playerBounderies.left<npcBounderies.left)return setPreventRight(true);
    //   if(playerMeetsNpcFromTopOrBottom && playerMeetsNpcFromLeftOrRight && playerBounderies.left>npcBounderies.left)return setPreventLeft(true);
  };

  const checkHide = (npcBounderies) => {
    if (!npcBounderies) return;
    const playerBounderies = playerRef.current.getBoundingClientRect();
    if (
      Math.abs(playerBounderies.left - npcBounderies.left) <
      npcBounderies.width / 5
    ) {
      return setCoveringNpcs((prev) => prev + 1);
    }
  };

  //GAME OVER
  const gameOver = () => {
    setMoove(false);
    setGameIsOn(false);
    clearInterval(timeRemainingInterval);
    clearInterval(greenLightInterval);
    setTimeRemaining(0);
    setMessage("💀 GAME OVER");
  };

  return (
    <div className="test-game">
      <button id="startGame" onClick={startGame}>
        START GAME
      </button>
      <Doll />

      <div className="timer">{message || timeRemaining}</div>

      {players
        .filter((player) => player.number !== playerNum)
        .map((player, index) => {
          return (
            <Npc
              index={index}
              gameIsOn={gameIsOn}
              checkCollision={checkCollision}
              checkHide={checkHide}
              checkForCoveringNpcs={checkForCoveringNpcs}
              killNpc={killNpc}
              greenLight={greenLight}
              key={player._id}
              npcsAmount={players.length - 1}
              number={player.number}
              resetPosition={resetPosition}
            />
          );
        })}

      <motion.div
        className="playerInGame currentPlayer"
        style={{
          transform: `translate(${translateXPlayer}px,${translateYPlayer}px)`,
        }}
        ref={playerRef}
        key={playerNum}
      >
        {playerNum}
      </motion.div>
      <audio src={soundEffect} ref={soundEffectRef} />
    </div>
  );
}
/*
  const [randPosX, setRandPosX] = useState(0);
  const [randPosY, setRandPosY] = useState(0);
  let xRand = Math.floor(Math.random() * window.innerWidth);
  let yTand = Math.ceil(Math.random() * -window.screen.height);
*/
