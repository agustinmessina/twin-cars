import React, { useState, useEffect } from 'react';
import './main-menu.css';
import ConfigMenu from '../config-menu/config-menu';
import GameComponent from '../../game/game-component';

function MainMenu() {
  const [gameSettings, setGameSettings] = useState({
    speed: 1,
    difficulty: 1,
    duration: 300,
  });

  const [inCofigMenu, setInConfigMenu] = useState(false);
  const [inGame, setInGame] = useState(false);
  
  const handleSave = settings => {
    setGameSettings(settings);
    setInConfigMenu(false);
  }

  const addPotentiometerEvent = setEvent => {
    const event = new EventSource('http://localhost:3000/potentiometerValues');
    event.addEventListener('error', error => {
      console.log('error', error);
      alert('Error, no se pudo conectar con el servidor')
      window.close();
    });
    event.addEventListener('connection-error', error => {
      alert(`Error de conexion: ${error.data}`);
      window.close();
    })
  
    setEvent(event);
  }

  const [potentiometerEvent, setPotentiometerEvent] = useState(null);

  useEffect(() => {
    if (process.env.REACT_APP_USE_POTENTIOMETER) {
      addPotentiometerEvent(setPotentiometerEvent);
    }
  }, []);

  return (
    <div className="parent-container">
      {!inCofigMenu && !inGame &&
        <div className="menu main-menu">
          <button className="primary-btn" onClick={() => setInGame(true)}>JUGAR</button>
          <button className="secondary-btn" onClick={() => setInConfigMenu(true)}>CONFIGURAR</button>
        </div>
      }
      {inCofigMenu &&
        <ConfigMenu
          gameSettings={gameSettings}
          onSave={settings => handleSave(settings)}
          onCancel={() => setInConfigMenu(false)}
        />
      }
      {inGame &&
        <GameComponent
          gameSettings={gameSettings}
          potentiometerEvent={potentiometerEvent}
          onGameQuit={() => setInGame(true)}
        />
      }
    </div>
  )
}

export default MainMenu;