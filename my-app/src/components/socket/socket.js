import {io} from "socket.io-client";

const url="http://localhost:4000";

const Socket=io(url,{
    autoConnect:false
})
export {Socket};