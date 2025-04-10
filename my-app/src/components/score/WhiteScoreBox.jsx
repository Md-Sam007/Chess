import Peices from "../peices";
export default function ScoreBox(props){
    
    return(
        
        <div className="text-[1.2em] text-white pt-[2vmin] lg:text-[1.6em] pl-[1vmin]">
                    
                    <div className="h-[8vmin] flex justify-between mt-[2vmin] w-[28vmin] p-1 ">
                        <div className="text-[0.7em] lg:text-[1em]"><Peices peice={props.peice} color={props.color}/></div>
                        <div className="text-[0.7em] ml-[2vmin]">From</div>
                        <div className="ml-[2vmin]">{props.from}</div>
                        <div className="text-[0.7em] ml-[2vmin]">To</div>
                        <div className="ml-[2vmin]">{props.to}</div>
                    </div>
                </div>
        
   
        
    )
}