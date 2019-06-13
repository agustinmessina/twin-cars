import Game from './game/game';

export default function sketch(p) {
  const gameSettings = {
    speed: 4,
    difficulty: 3,
    duration: 15,
    initialTime: Date.now()
  }
  
  let game;
  let expected = 0;
  let timeEnded = false;

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props) {
      // console.log(props);
    }
  }
  
  p.setup = () => {
    game = new Game(gameSettings, p);
    game.setupGame();
  }
  
  p.draw = () => {
    if ((Date.now() - gameSettings.initialTime) >= (gameSettings.duration * 1000)) timeEnded = true;
  
    if (!timeEnded) {
      game.playGame();
      expected++;
    } else {
      game.pauseGame();
    }
  
    p.fill(255, 0, 0);
    p.text(Math.floor(expected), p.width - 30, 20);
  }
  
  p.keyPressed = () => {
    game.handleKeystrokes(p.keyCode);
  }
};