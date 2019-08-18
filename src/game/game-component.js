import React from 'react';
import sketch from './sketch-components/sketch';
import P5Wrapper from 'react-p5-wrapper';
import './game-component.css';

function GameComponent({gameSettings}) {
  return (
    <div>
      {/* <div className="container">
        <h3>Juego terminado!</h3>
        <hr />
        <div className="score">
          <p>Puntaje</p>
          <p>1300</p>
        </div><div className="highscore">
          <p>Puntaje mas alto</p>
          <p>1500</p>
        </div>
        <hr />
        <div className="buttons">
          <button onClick={() => props.onGameFinished()}>Salir</button>
          <button>Jugar de nuevo</button>
        </div>
      </div> */}
      <div className="menu menu-game">
        <h2 className="game-title white-yellow-words">JUEGO TERMINADO!</h2>
        <div className="scores">
          <div className="score-text">PUNTAJE</div>
          <div className="score">15000</div>
        </div>
        <button className="secondary-btn quit-btn">SALIR</button>
        <button className="primary-btn play-again-btn">JUGAR DE NUEVO</button>
      </div>
      {/* <P5Wrapper sketch={sketch} gameSettings={gameSettings} /> */}
    </div>
  );
}

export default GameComponent;