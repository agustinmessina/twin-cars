import React from 'react';
import sketch from './sketch-components/sketch';
import P5Wrapper from 'react-p5-wrapper';
import './game-component.css';

function GameComponent() {
  return (
    <div className="parent">
      <div className="container">
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
          <button>Salir</button>
          <button>Jugar de nuevo</button>
        </div>
      </div>
      {/* <P5Wrapper sketch={sketch} gameSettings={this.props.gameSettings} /> */}
    </div>
  );
}

export default GameComponent;