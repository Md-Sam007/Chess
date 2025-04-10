import { useEffect ,useState,useRef} from "react"


export default function StopWatch(props) {
    const [minute, setMinute] = useState(10);
     const [second, setSecond] = useState(0);
     const intervalRef = useRef(null);
     const name=useRef(generator());
     
    useEffect(()=>{
        
        if (props.watch === "start") {
            if (intervalRef.current) clearInterval(intervalRef.current);
      
            intervalRef.current = setInterval(() => {
              setSecond((prevSecond) => {
                if (prevSecond === 0) {
                  setMinute((prevMinute) => {
                    if (prevMinute === 0) {
                      clearInterval(intervalRef.current);
                      return 0;
                    } else {
                      return prevMinute - 1;
                    }
                  });
                  return 59;
                } else {
                  return prevSecond - 1;
                }
              });
            }, 1000);
          }
      
          if (props.watch === "stop") {
            clearInterval(intervalRef.current);
          }
      
          return () => clearInterval(intervalRef.current);

    },[props.watch])

   
    return (
        <div>
            <div className="h-[9vmin] w-full bg-[#292727] p-1 lg:h-[7vmin] flex justify-between">
                <div className="w-[30vmin] pl-7 h-[7vmin]   text-[1.6em] text-white lg:text-[2.6em]"> {minute.toString().padStart(2, '0')}:{second.toString().padStart(2, '0')}</div>
                <div className="w-[34vmin] h-[6vmin]  lg:text-[2em] text-[1em] text-white">GUEST{name.current }</div>

            </div>
        </div>
    )
}
function generator(){
    return (Math.random().toString(36).substring(2,2+7))
}