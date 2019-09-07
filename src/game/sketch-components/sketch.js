import Game from './game';

export default function sketch(p) {
  let gameSettings;
  let game;
  let timeEnded = false;
  let gameStarted = false;

  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    if (props && props.gameSettings) {
      gameSettings = {
        ...props.gameSettings,
        initialTime: Date.now(),
      }

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
      game.setupGame(gameSettings);
      gameStarted = true;
    }

    const ellapsedTime = (Date.now() - gameSettings.initialTime) / 1000;

    const countdownDuration = 3;
    if (ellapsedTime <= countdownDuration) {
      const countdown = countdownDuration - Math.floor(ellapsedTime);
      game.showCountdown(countdown);
      
      return;
    }

    timeEnded = (Date.now() - gameSettings.initialTime) >= ((gameSettings.duration + countdownDuration) * 1000);

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