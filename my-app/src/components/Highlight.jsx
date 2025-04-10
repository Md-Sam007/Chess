export default function HeightLIght (props){
   
   return(
   <div className={props.highlight.some((i) => i === props.squareName) ?"h-5 w-5 z-[1] lg:h-8 lg:w-8 bg-[#BDB76B] rounded-2xl mt-3 lg:mt-5":""}></div>
   )
} 