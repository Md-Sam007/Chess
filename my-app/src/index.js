import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import { ChessMovesProvider } from './components/Context/Moves';
import { GameProvider } from './components/Context/Game';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <ChessMovesProvider>
            <GameProvider>
                 
                        <App/>
                 
                  
            </GameProvider>
            
      </ChessMovesProvider>
  
);


