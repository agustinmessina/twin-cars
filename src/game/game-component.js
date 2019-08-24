import React, { useState } from 'react';
import sketch from './sketch-components/sketch';
import P5Wrapper from 'react-p5-wrapper';
import './game-component.css';

function GameComponent({ gameSettings, onGameQuit }) {
  const [gameEnded, setGameEnded] = useState(false);

  return (
    <div className="game-container">
      {!gameEnded &&
        <div className="game">
          <P5Wrapper sketch={sketch} gameSettings={gameSettings} onGameEnded={() => setGameEnded(true)}/>
        </div>
      }
      {gameEnded && 
        <div className="menu menu-game">
          <h2 className="game-title white-yellow-words">JUEGO TERMINADO!</h2>
          <div className="scores">
            <div className="score-text">PUNTAJE</div>
            <div className="score">15000</div>
          </div>
          <button 
            className="secondary-btn quit-btn" 
            onClick={onGameQuit}
          >
            SALIR
          </button>
          <button 
            className="primary-btn play-again-btn"
            onClick={() => setGameEnded(false)}
          >
            JUGAR DE NUEVO
          </button>
        </div>
      }
    </div>
  );
}

export default GameComponent;