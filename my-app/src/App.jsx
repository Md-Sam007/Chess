import { useEffect,useContext,useRef } from "react";
import Bord from "./components/Bord";
import Score from "./components/score/Score";
import Title from "./components/Title";


export default function App() {
 

    
    return (

        <div className={`bg-[#292727]  sm:justify-center break-words `}>
          
            
            <div>
            <Title/>

            <div className="h-screen lg:w-[80%] lg:h-[91.8vmin] grid grid-rows-2 lg:pl-[10vmin] gap-7 lg:pt-[1vmin] pt-[5vmin] lg:grid-cols-2 lg:gap-[30vmin] justify-items-center lg-grid-row-1 lg:justify-items-stretch ">
                
                
                < div className="">
                    <Bord />
                    </div>
                <div ><Score /></div>
                

            </div>
            </div>
            
            
        </div>

    )
}