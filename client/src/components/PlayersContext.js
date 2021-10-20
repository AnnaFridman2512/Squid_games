import React, {useState, useCallback} from 'react';

export const PlayersContext = React.createContext({
    players:[],
    setPlayers: () => [],
    getPlayers: ()=> []
});

export default function PlayersProvider({children}){
    const [players, setPlayers]= useState([]);

const getPlayers = useCallback(() =>{
    fetch('/api/players')
    .then(res=> res.json())
    .then(data => setPlayers(data))
    .then(console.log(players))
}, [])


return (
    <PlayersContext.Provider value={{
        players,
        setPlayers,
        getPlayers
    }}>
        {children}
    </PlayersContext.Provider>

);
}