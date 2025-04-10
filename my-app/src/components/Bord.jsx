import { Chess } from "chess.js";
import React, { useState, useRef, useEffect, useContext } from "react";
import Peices from "./peices";
import HeightLIght from "./Highlight";
import { findPeice, checkMoves } from "./chessLogic";
import { ChessContext } from "./Context/Moves";
import { GameContext } from "./Context/Game";
import { Socket } from "./socket/socket.js";
import StopWatch from "./stopWatch/StopWatch";
import img from "../asserts/backgoround.png";
import PopUp from "./popUp/pop";

import Loading from "./loading";
export default function Board() {

  const connectRef = useRef(null);

  const chess = useRef(new Chess());
  const [Board, setBoard] = useState(chess.current.board());
  const [from, setFrom] = useState(null);
  const [afterMove, setMove] = useState(false);
  const [checkHighlight, setCheckHighlight] = useState()
  const [roomId, setId] = useState("");

  //Player and Opponent
  const [Playercolor, setcolor] = useState(null);
  const [OpponentColor,setOppcolor]=useState(null);
  //stopwatch
  const [PlayerTimmer,setPlayerTimmer]=useState("stop");
  const [OpponentTimmer,setOpponentTimmer]=useState("stop");
 

  

  const { waiting, setwait } = useContext(GameContext)

  const { Restart, setRestart } = useContext(GameContext);
  const { vibrate, setVibrate } = useContext(GameContext) //vibrate
  const { MovePlayed, setMovesPlayed } = useContext(ChessContext)

  //game Status
  const { GameState, setGameState } = useContext(GameContext);

  const [highlight, setHighlight] = useState([]);

  //pop UP window
  const [popUp,setpopUp]=useState(null);


  useEffect(() => {
    if (GameState === false) return
   
    if (!connectRef.current) {
      Socket.connect();
      connectRef.current = true;

      const user = "Guest" + Date.now();
      Socket.emit("userId", user);

      Socket.on("roomId", ({ roomId, color, wait   }) => {
       
        setId(roomId);
        setcolor(color);
        
        


        color==="w"?setOppcolor("b"):setOppcolor("w");//assigning opponent color
        
        if(color)color==="w"?setPlayerTimmer("start"):setOpponentTimmer("start");//stopWatch
        
        if (wait === true) {
          setwait(true);
        }
        else {
          setwait(false);
        }
      })

      Socket.on("opponentMove", ({ from, to }) => {
        
        setOpponentTimmer("stop");
        setPlayerTimmer("start");
        chess.current.move({ from: from, to: to });
        setBoard(chess.current.board());
        setMovesPlayed(chess.current.history({ verbose: true }))
       

      })

      Socket.on("oppLeft",({msg})=>{
      
        setpopUp(msg);
        
      })
    }


  }, [GameState]);
 



  useEffect(() => {
    //logic for highlights on board
    if (from) {
      const legalMoves = chess.current.moves({ square: from, verbose: true });
      legalMoves.forEach((i) => { setHighlight(prev => [...prev, i.to]) })
    }
    else {
      setHighlight([]);//reset hightlights
    }


  }, [from])

  useEffect(() => {   //Game State
    if(Playercolor===chess.current.turn()){
      setPlayerTimmer("start");
      setOpponentTimmer("stop");
    }else if(OpponentColor===chess.current.turn()){
      setPlayerTimmer("stop");
      setOpponentTimmer("start");
    }


    if (chess.current.isCheckmate()) {
      
      setpopUp(chess.current.turn()==='w'?"BLACK WINS":"WHITE WINS");

    }
    else if (chess.current.isCheck()) {
     
      const color = chess.current.turn()

      setCheckHighlight(findPeice(Board, color, "k"))
    }
    else if (chess.current.isDraw()) {
      setpopUp("Match Draw");

    }

    else {
      setCheckHighlight()
    }
  }, [afterMove,Board])

  //restart Game
  useEffect(() => {

    if (Restart) {
      
      setpopUp(OpponentColor==='w'?"WHITE"+" "+" WINS":"BLACK"+" "+" WINS");
      Socket.emit("opponentLeft",{msg:"opponent Left!",roomId:roomId})
      Socket.disconnect();
      

    }
    

  }, [Restart])

  const handleMove = (from, to) => {
    
    const piece = chess.current.get(from);
    if (!piece) {
      console.log(`No piece on square ${from}`);
      return;
    }
    try {
      const move = chess.current.move({ from, to }, { strict: false });
    
      if (move) {
        Socket.emit("move", { from, to, roomId, Playercolor })
        setBoard(chess.current.board());
        setMove((prev) => !prev)
        setMovesPlayed(chess.current.history({ verbose: true }))
        //stopWtach;
        setPlayerTimmer("stop");
        
        if (typeof roomId !== "undefined") {
          setGameState(true);
        }

      } else {
        console.log(`Invalid move: ${from} -> ${to}`);
      }
    }
    catch (error) {

      return
    }

  };


  const handleEvent = (square, color) => {

    if (!GameState) {
      setVibrate(true);
      setInterval(() => { setVibrate(false) }, 1000)

      return;
    }


    if (!from) {
      // If no `from` is selected, set it
      const Peice = chess.current.get(square);
      
      if (Peice) {
        //check turn

        if (Playercolor !== chess.current.turn()) {


          return
        };

        setFrom(square);

      }
      else {
        return
      }

    }
    else {
      // Attempt a move

      if (checkMoves(from, square, chess.current)) {
        handleMove(from, square);
      }
      setFrom(null); // Reset `from` for the next move
    }
  };

  const click=()=>{
    window.location.reload(false);
  }



  return (
    waiting ?

      <Loading />

      :
      
        <div className="h-[auto] lg:col-span-2  lg:w-[90vmin] lg:gap-[20vmin]  font-[2em]">
          {GameState?<StopWatch watch={OpponentTimmer} />:""}
          {popUp?<PopUp msg={popUp} click={click}/>:""};
          
          
          {Playercolor ? (Playercolor === "b" ? [...Board].slice().reverse() : Board).map((row, i) => {
            const rowIndex = Playercolor === "b" ? 7 - i : i;

            return (
              
              
              <div key={i} className="flex">
                
                

                {Playercolor && (Playercolor === "b" ? [...row].slice().reverse() : row).map((square, j) => {
                  const colIndex = Playercolor === "b" ? 7 - j : j;
                  const squareName = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;

                  return (
                    <div
                      key={j}
                      onClick={() => handleEvent(squareName, square?.color)}
                      className={`h-[5vh] w-[9vw] lg:h-[80px] cursor-pointer hover:bg-yellow-300 flex justify-center text-[1.8em] text-center lg:text-[3em]  
                ${(i + j) % 2 === 0 ? `bg-[#e9e9e1]` : `bg-[#769656]`} 
                ${squareName === checkHighlight ? "bg-red-500" : ""}`}
                    >
                      {square?.type ? (
                        <Peices peice={square.type} color={square.color} />
                      ) : (
                        <HeightLIght squareName={squareName} highlight={highlight} />
                      )}
                    </div>
                  );
                })}


                
      </div>
    
      
            );
          }):<div><img src={img}/></div>}
          {GameState?<StopWatch watch={PlayerTimmer} />:""}
      </div>
      

  )
}



