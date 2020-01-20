import React from 'react';
import './instructions-menu.css';

const InstructionsMenu = ({onQuit}) => {
  return (
    <div className="menu menu-instructions">
      <h1 className="title white-yellow-words">INSTRUCCIONES</h1>
      <div className="instructions">El juego consiste en mantener los autos (los rectangulos blancos) dentro de sus respectivos 
        caminos para obtener puntos. Al salirse del camino (cambia su color a rojo) van perdiendo puntos. Los autos tienen 
        movimiento horizantal. Con las teclas "A" y "D" movemos el auto de la izquierda y con "J" y "L" el de la derecha
      </div>
      <button className="secondary-btn" onClick={onQuit}>SALIR</button>
    </div>
  )
}

export default InstructionsMenu;