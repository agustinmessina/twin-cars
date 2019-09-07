import React, { useState } from 'react';
import './main-menu.css';
import ConfigMenu from '../config-menu/config-menu';
import GameComponent from '../../game/game-component';

function MainMenu() {
  const [gameSettings, setGameSettings] = useState({
    speed: 1,
    difficulty: 1,
    duration: 60,
  });

  const [inCofigMenu, setInConfigMenu] = useState(false);
  const [inGame, setInGame] = useState(false);

  function handleSave(settings) {
    setGameSettings(settings);
    setInConfigMenu(false);
  }

  function handleConfigClick() {
    setInConfigMenu(true);
  }

  function handlePlayClick() {
    setInGame(true);
  }

  function handleGameQuit() {
    setInGame(false);
  }

  return (
    <div className="parent-container">
      {!inCofigMenu && !inGame &&
        <div className="menu main-menu">
          <button className="primary-btn" onClick={handlePlayClick}>JUGAR</button>
          <button className="secondary-btn" onClick={handleConfigClick}>CONFIGURAR</button>
        </div>
      }
      {inCofigMenu &&
        <ConfigMenu gameSettings={gameSettings} onSave={settings => handleSave(settings)} onCancel={() => setInConfigMenu(false)} />
      }
      {inGame &&
        <GameComponent gameSettings={gameSettings} onGameQuit={handleGameQuit}/>
      }
    </div>
  )
}

export default MainMenu;