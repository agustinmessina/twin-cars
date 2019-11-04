import Game from './game';

export default function sketch(p) {
  let gameSettings;
  let potentiometerEvent;
  let game;
  let timeEnded = false;
  let gameStarted = false;
  
  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    if (props && props.gameSettings) {
      gameSettings = {
        ...props.gameSettings,
        initialTime: Date.now(),
      }

      potentiometerEvent = props.potentiometerEvent;
      
      p.onGameEnded = props.onGameEnded;
    }
  }

  p.onGameEnded = () => {}
  
  p.setup = () => {
    game = new Game(p);
  }
  
  p.draw = () => {
    if (!gameSettings) return;
    
    if (!gameStarted) {
      gameStarted = true;
      game.setupGame(gameSettings, potentiometerEvent);
    }

    const now = Date.now();
    const countdownDuration = 3;
    const ellapsedTime = (now - gameSettings.initialTime) / 1000;

    if (ellapsedTime <= countdownDuration) {
      const countdown = countdownDuration - Math.floor(ellapsedTime);
      game.showCountdown(countdown);
      
      return;
    }

    timeEnded = (now - gameSettings.initialTime) >= ((gameSettings.duration + countdownDuration) * 1000);

    if (!timeEnded) {
      game.playGame();
    } else {
      game.pauseGame();
      p.onGameEnded(game.getGamePoints());
    }
  }
  
  p.keyPressed = () => {
    game.handleKeystrokes(p.keyCode);
  }
};