import React, {useState, useCallback, useEffect} from 'react';

export const PlayersContext = React.createContext({
    playerNum: 0,
    setPlayerNum: () => [],
    players:[],
    setPlayers: () => [],
    getPlayers: ()=> [],
    choosePlayer: ()=> []
});

export default function PlayersProvider({children}){
    const [playerNum, setPlayerNum] = useState(0);
    const [players, setPlayers]= useState([]);

const getPlayers = useCallback(() =>{
    fetch('/api/players')
    .then(res=> res.json())
    .then(data => setPlayers(data))
    .then(console.log(players))
}, []);

 const choosePlayer = (number) =>{
    setPlayerNum(number);
 }


return (
    <PlayersContext.Provider value={{
        playerNum,
        setPlayerNum,
        players,
        setPlayers,
        getPlayers,
        choosePlayer
    }}>
        {children}
    </PlayersContext.Provider>

);
}