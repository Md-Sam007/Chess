export default function PopUp(props){
    return (
        <div className="h-[40vmin] text-center  p-8 bg-black rounded-3xl z-10 w-[60vmin] absolute top-[40vmin] left-[20vmin]">
            <h1 className="text-[1.2em] text-white"> {props.msg}</h1>
            <button className="mt-[5vmin] text-white" onClick={props.click}>OK</button>
        </div>
        
    )
}