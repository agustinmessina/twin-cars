import Game from './game';

export default function sketch(p) {
  let gameSettings;
  let game;
  let expected = 0;
  let timeEnded = false;
  let gameStarted = false;

  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    if (props && props.gameSettings) {
      gameSettings = {
        ...props.gameSettings,
        initialTime: Date.now(),
      }

      p.onGameEnded = props.onGameEnded;

      // gameEnded = props.onGameFinished
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
      expected++;
    } else {
      game.pauseGame();
      p.onGameEnded();
    }
  
    p.fill(255, 0, 0);
    p.text(Math.floor(expected), p.width - 30, 20);
  }
  
  p.keyPressed = () => {
    game.handleKeystrokes(p.keyCode);
  }
};