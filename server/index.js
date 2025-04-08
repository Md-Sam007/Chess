import express from "express";
import { createServer } from 'node:http';
import {Server} from "socket.io";
import cors from "cors";


const app= express();
const port =4000;
const server= createServer(app);
const io=new Server(server,{
  cors:{
    origin:"http://localhost:3001",
  }
}) 

app.use(cors({
  origin:"http://localhost:3001",
}));
app.get("/",(req,res)=>{
    
})


let waitingPlayer=null;
let rooms={};

io.on('connection', (socket) => {
    
  //creating room Id
    if(!waitingPlayer){
       waitingPlayer=socket.id;
       io.to(waitingPlayer).emit("roomId",{wait:true})
       
    }else{
      const roomId=`${waitingPlayer}-${socket.id}`;
      rooms[roomId]=[waitingPlayer,socket.id];
     
    const playerColor={
      [waitingPlayer]:"w",
      [socket.id]:"b"
    }
    
    if(waitingPlayer!==socket.id){
      //assigning color and roomId
      io.to(waitingPlayer).emit("roomId",{roomId,color:playerColor[waitingPlayer]});
      io.to(socket.id).emit("roomId",{roomId,color:playerColor[socket.id]});

    } 
    

    socket.join(roomId);
    io.sockets.sockets.get(waitingPlayer)?.join(roomId);

    console.log(`Room Created: ${roomId} (White: ${waitingPlayer}, Black: ${socket.id})`);
    waitingPlayer = null;
  }

    socket.on("move",({from,to,roomId,Playercolor})=>{
      console.log(Playercolor,from,to);
      socket.to(roomId).emit("opponentMove", {from,to});
      
    })
    socket.on("opponentLeft",({msg,roomId})=>{
      io.to(roomId).emit("oppLeft",{msg:msg});
      
    })

    socket.on("disconnect",({msg})=>{

      socket.disconnect();
      
      console.log("User disconnected:", socket.id);
      if (waitingPlayer === socket.id) {
        waitingPlayer = null; // Reset waiting player if they leave
      }
      // Remove player from any rooms
      Object.keys(rooms).forEach((roomId) => {
        if (rooms[roomId].includes(socket.id)) {
          
          delete rooms[roomId];
          
        }
      });
    })
  });
  

server.listen(port,()=>{
    console.log("server is running on port 4000");
})