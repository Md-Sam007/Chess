import { useContext ,useEffect,useState} from "react"
import { ChessContext } from "../Context/Moves";
import WhiteScoreBox from "./WhiteScoreBox";
import { GameContext } from "../Context/Game";


export default function Score() {
    const { MovePlayed, setMovesPlayed } = useContext(ChessContext)
    const {GameState,setGameState}=useContext(GameContext);
    const {waiting,setwait}=useContext(GameContext);
    const {vibrate,setVibrate}=useContext(GameContext)
    const {Restart,setRestart}=useContext(GameContext);

    const [invis,setinvis] =useState("Play");

    function handleEvent(){
        setGameState(true);
        
        if(document.getElementById("name").innerHTML==="Forfiet"){
            
            setRestart(true);
            
        }
        
    }
    
    useEffect((e)=>{
        if(!GameState){
            setinvis("Play");
        }
        else if(waiting ){
            setinvis("Cancel");
        }
        else {
            setinvis("Forfiet");
        }
    },[GameState,waiting])
   
    return (
        <div className="ml-0  ">
            <div className={`max-h-[60vh] ml-[10vmin] h-full w-[50vw]`}>
                 <button onClick={handleEvent} id="name" className={`w-full lg:text-[2em]  ${vibrate?"animate-shake":""}  max-w-[270px] h-[60px] ${invis==='Play'?"bg-[blue] text-[red]":"bg-[red] text-white"} rounded-[20px] lg:h-[80px]`}>
                    {invis}
                </button>
            </div>
            <div className={`h-[40vh] w-[75vw] mt-3  flex  xl:h-[70vh] xl:w-[45vw] ${GameState===true && waiting===true ||GameState===false ?"invisible":"visible"} ${MovePlayed.length>=11?"overflow-y-scroll":""} `}>

                <div className="h-auto w-[37vw]  lg:w-[30vw] border-r-2 border-white  ">
                    <div className="text-[1.8em] text-white pl-5 xl:text-[3em]">
                        white
                    </div>
                    {MovePlayed.map((e,index) => {

                        if (e.color === 'w') {
                            return (
                                <WhiteScoreBox key={index} peice={e.piece} color="w" from={e.from} to={e.to} />

                            )
                        }
                    })}
                </div>
                <div className="h-[20vh]  w-[26vw] ">
                    <div className="text-[1.8em] text-white pl-2 xl:text-[3em]">
                        Black
                    </div>
                    {MovePlayed.map((e,index) => {

                        if (e.color === 'b') {
                            return (
                                <WhiteScoreBox key={index} peice={e.piece} from={e.from} color="b" to={e.to} />

                            )
                        }
                    })}

                </div>


            </div>
        </div>
    )
}

