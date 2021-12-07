import React, { useState, useCallback, useRef } from "react";

export const PlayersContext = React.createContext({
  changeTime: 5000,
  setChangeTime: () => [],
  totalTime: 60000,
  setTotalTime: ()=> [],
  greenLightInterval: ()=> [],
  timeRemainingInterval: ()=> [],
  gameOverInterval: ()=> [],
  playerNum: 0,
  setPlayerNum: () => [],
  players: [],
  setPlayers: () => [],
  getPlayers: () => [],

});

export default function PlayersProvider({ children }) {
  const [playerNum, setPlayerNum] = useState("you");
  const [players, setPlayers] = useState([]);
  const [isMounted, setIsmounted] = useState(true);


  const getPlayers = useCallback(() => {
    fetch("/api/players")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
       if(isMounted){
        setPlayers(data);
       } 
      })
      return (() => { //Fixing memory leak 
        setIsmounted(false);
      } )
  }, []);

  const choosePlayer = (number) => {
    setPlayerNum(number);
  };


  return (
    <PlayersContext.Provider
      value={{
        playerNum,
        setPlayerNum,
        players,
        setPlayers,
        getPlayers,
        choosePlayer,

      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}
