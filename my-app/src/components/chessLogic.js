const gameEvents=(chess)=>{
    let winner;
      
      if(chess.turn()==='b'){
        winner='White';
      }else{
        winner='Black'
      };
      setTimeout(()=>{
        alert("CHECKMATE!"+" "+winner+" " +"WINS")
      },300);
      return ("restart");
}

const checkMoves=(from ,to,chess)=>{
    const legalMoves = chess.moves({ square: from, verbose: true });
    if(legalMoves.length===0){
      
      return;
    }
    else{
      
     return true
    }

  }

  


const findPeice=(board,color,peice)=>{
    
    let square;
    board.map(element => {
        return element.map((val)=>{
            if(val){
                if(val.type===peice && val.color===color){
                    
                    square=val.square
                }
            }
        })
        
    });
    
    return square
}



export {findPeice,checkMoves,gameEvents};