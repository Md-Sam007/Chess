import React,{ createContext ,useState } from "react";
export  const GameContext=createContext();

export const GameProvider=({children})=>{
    const [GameState,setGameState]=useState(false);
    const [Restart,setRestart]=useState(false);
    const [vibrate,setVibrate]=useState();
    const [waiting,setwait]=useState(false);
    return(
    <GameContext.Provider value={{GameState,setGameState,Restart,setRestart,vibrate,setVibrate ,waiting,setwait}}>
        {children}
    </GameContext.Provider>
)
}

