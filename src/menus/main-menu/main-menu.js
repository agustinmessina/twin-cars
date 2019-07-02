import React, { useState } from 'react';
import './main-menu.css';
import ConfigMenu from '../config-menu/config-menu';
import GameComponent from '../../game/game-component';

function MainMenu() {
  const [gameSettings, setGameSettings] = useState({
    speed: 4,
    difficulty: 3,
    duration: 10,
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

  function handleGameFinished() {
    setInGame(false);
  }

  return (
    <div>
      {!inCofigMenu && !inGame &&
        <div>
          <button onClick={handlePlayClick}>Jugar</button>
          <button onClick={handleConfigClick}>Configurar</button>
        </div>
      }
      {inCofigMenu &&
        <ConfigMenu gameSettings={gameSettings} onSave={settings => handleSave(settings)} />
      }
      {inGame &&
        <GameComponent gameSettings={gameSettings} />
      }
    </div>
    // <GameComponent gameSettings={gameSettings} />
  )
}

export default MainMenu;