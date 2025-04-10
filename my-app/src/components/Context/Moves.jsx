import React,{createContext,useState} from "react";
export const ChessContext=createContext();

export const ChessMovesProvider=({children})=>{
    const [MovePlayed,setMovesPlayed]=useState([]);
    return (
        <ChessContext.Provider value={{MovePlayed,setMovesPlayed}}>
            {children}
        </ChessContext.Provider>
    )
}