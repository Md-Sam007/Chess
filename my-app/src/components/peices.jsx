
  ///importing peices Unix Code

  export  default  function peices(props){
      const peices=(peice,color)=>{
          
        let result;
          switch (peice){
            case 'p':    
              if(color==='w'){
                result= "♙";
                
              }else{
                result= "♟"
                
              }
              break;
            case 'k':
              if(color==='w'){
                
                result= "♔";
                
            }else{
              result= "♚"
              
              
            }
            break;
            case 'q':
              if(color==='w'){
                result= "♕";
            }else{
              result= "♛"
              
            }
            break;
            case 'r':
              if(color==='w'){
                result= "♖";
            }else{
              result= "♜"
              
            }
            break;
            case 'n':
              if(color==='w'){
                result= "♘";
            }else{
              result= "♞"
              
            }
            break;
            case 'b':
              if(color==='w'){
                result= "♗";
            }else{
              result= "♝"
              
            }
            break;
            
          }
          return result
          
      }
      return(
          <div className={`z-0  `}>{peices(props.peice,props.color)}</div>

      )
  }