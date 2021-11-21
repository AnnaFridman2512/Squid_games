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
  document.querySelector("audio")?.play();
};

const pauseAudio = () => {
  document.querySelector("audio")?.pause();
};

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

  //MOVEMENT
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [moveUp, setMoveUp] = useState(false);
  const [moveDown, setMoveDown] = useState(false);
  const [npcBounderiesArray, setNpcBoundriesArray] = useState(
    Array(6).fill({})
  );

  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME / 1000);
  const [message, setMessage] = useState("");

  //PLAYING AND PAUSING SOUND
  const playGreenLightSound = () => {
    let i = 0;
    playAudio();
    const playInterval = setInterval(() => {
      if (i++ % 2 === 1) {
        playAudio();
      } else {
        pauseAudio();
      }
      if (i > TOTAL_TIME / CHANGE_TIME) clearInterval(playInterval);
    }, CHANGE_TIME);
  };

  //CHECK WIN
  useEffect(() => {
    if (translateYPlayer <= -(window.innerHeight * 0.93 - 150)) {
      setMessage("🏆 WIN");
      setGameIsOn(false);
    }
  }, [translateYPlayer]);

  //RESET POSITION
  useEffect(() => {
    setTranslateXPlayer(0);
    setTranslateYPlayer(0);
  }, [resetPosition]);

  //CEHCK FOR GAMEOVER
  useEffect(() => {
    if (timeRemaining === 0 && gameIsOn) {
      return gameOver();
    }
    if (gameIsOn && timeRemaining > 0 && !greenLight && moove) {
      setCoveringNpcs(0);
      setCheckForCoveringNpcs((prev) => !prev);
    }
  }, [greenLight, timeRemaining, moove, gameIsOn]);

  //MOVE PLAYER BY KEYBOARD
  useEffect(() => {
    const movePlayerByKeyboard = (e) => {
      if (e.keyCode === 37) setMoveLeft(true);
      if (e.keyCode === 39) setMoveRight(true);
      if (e.keyCode === 38) setMoveUp(true);
      if (e.keyCode === 40) setMoveDown(true);
    };
    if (gameIsOn) {
      window.addEventListener("keydown", movePlayerByKeyboard);
    } else {
      window.removeEventListener("keydown", movePlayerByKeyboard);
    }

    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      setMoove(false);
    });
  }, [gameIsOn]);

  //HANDLE COVERING NPCS
  useEffect(() => {
    if (coveringNpcs > 0) clearInterval(gameOverInterval);
    if (gameIsOn && moove && !greenLight && coveringNpcs === 0) {
      gameOverInterval = setInterval(gameOver, 166);
    }
  }, [coveringNpcs, gameIsOn, moove, greenLight]);

  //CLEAR INTERVALS - CLEANUP
  useEffect(() => {
    return () => {
      clearInterval(timeRemainingInterval);
      clearInterval(greenLightInterval);
      clearInterval(gameOverInterval);
    };
  }, []);

  //CHECK IF CAN MOVE
  const checkIfCanMove = (direction) => {
    let playerCanMove = true;
    const playerBounderies = playerRef.current.getBoundingClientRect();
    const playerMeetsNpcFromEastOrWestSide = (npcBounderies) =>
      +Math.abs(playerBounderies.top - npcBounderies.top) <
      npcBounderies.bottom - npcBounderies.top;

    const playerMeetsNpcFromNorthOrSouthSide = (npcBounderies) =>
      +Math.abs(playerBounderies.left - npcBounderies.left) <
      npcBounderies.right - npcBounderies.left;

    const isNpcNearPlayer = (npcBounderies) =>
      playerMeetsNpcFromEastOrWestSide(npcBounderies) &&
      playerMeetsNpcFromNorthOrSouthSide(npcBounderies);

    if (direction === "left") {
      npcBounderiesArray.forEach((npcBounderies, _) => {
        if (
          isNpcNearPlayer(npcBounderies) &&
          playerBounderies.left > npcBounderies.left
        ) {
          playerCanMove = false;
        }
      });
    }
    if (direction === "right") {
      npcBounderiesArray.forEach((npcBounderies) => {
        if (
          isNpcNearPlayer(npcBounderies) &&
          playerBounderies.right < npcBounderies.right
        )
          playerCanMove = false;
      });
    }
    if (direction === "up") {
      npcBounderiesArray.forEach((npcBounderies) => {
        if (
          isNpcNearPlayer(npcBounderies) &&
          playerBounderies.top < npcBounderies.bottom
        )
          playerCanMove = false;
      });
    }
    if (direction === "down") {
      npcBounderiesArray.forEach((npcBounderies) => {
        if (
          isNpcNearPlayer(npcBounderies) &&
          playerBounderies.top < npcBounderies.top
        )
          playerCanMove = false;
      });
    }
    return playerCanMove;
  };

  //HANDLE PLAYER MOVEMENT
  useEffect(() => {
    moveLeft &&
      checkIfCanMove("left") &&
      (() => {
        setTranslateXPlayer((prev) => prev - 1);
        setMoove(true);
      })();

    moveRight &&
      checkIfCanMove("right") &&
      (() => {
        setTranslateXPlayer((prev) => prev + 1);
        setMoove(true);
      })();
    moveUp &&
      checkIfCanMove("up") &&
      (() => {
        setTranslateYPlayer((prev) => prev - 1);
        setMoove(true);
      })();
    moveDown &&
      checkIfCanMove("down") &&
      (() => {
        setTranslateYPlayer((prev) => prev + 1);
        setMoove(true);
      })();
    setMoveLeft(false);
    setMoveRight(false);
    setMoveUp(false);
    setMoveDown(false);
  }, [moveLeft, moveRight, moveUp, moveDown, moove]);

  const startGame = () => {
    playGreenLightSound();
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
        setWarning(true);
        setTimeout(() => {
          setGreenLight((prev) => !prev);
          setWarning(false);
        }, 333);
      } else {
        setGreenLight((prev) => !prev);
      }
    }, CHANGE_TIME);
  };

  //NPC FUNCATIONALLITY
  const killNpc = (npcNumber) => {};

  //
  const reportNpcBoundries = (npcBounderies, npcIndex) => {
    if (!npcBounderies) return;
    setNpcBoundriesArray((prev) =>
      prev.map((boundries, index) => {
        if (index === npcIndex) return npcBounderies;
        return boundries;
      })
    );
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
    <div
      className="wrapper"
      style={{ background: `url("/api/photos/meadow.jpg")` }}
    >
      <div className="game-top">
        <div className="timer">{message || timeRemaining}</div>
        <button id="startGame" onClick={startGame}>
          START GAME
        </button>
      </div>

      <Doll greenLight={greenLight} />
      <div className="field">
        {players
          .filter((player) => player.number !== playerNum)
          .map((player, index) => {
            return (
              <Npc
                index={index}
                gameIsOn={gameIsOn}
                reportNpcBoundries={reportNpcBoundries}
                checkHide={checkHide}
                checkForCoveringNpcs={checkForCoveringNpcs}
                killNpc={killNpc}
                greenLight={greenLight}
                key={player._id}
                npcsAmount={players.length - 1}
                number={player.number}
                image={player.image}
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
          onClick={startGame}
        >
          {playerNum}
        </motion.div>
        <audio src={soundEffect} ref={soundEffectRef} />
      </div>
    </div>
  );
}
