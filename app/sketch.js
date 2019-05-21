const gameSettings = {
  speed: 4,
  difficulty: 3,
  duration: 15,
  initialTime: Date.now()
}

let game;
let expected = 0;
let timeEnded = false;

function setup() {
  game = new Game(gameSettings);
  game.setupGame();
}

function draw() {
  if ((Date.now() - gameSettings.initialTime) >= (gameSettings.duration * 1000)) timeEnded = true;

  if (!timeEnded) {
    game.playGame();
    expected++;
  } else {
    game.pauseGame();
  }

  fill(255, 0, 0);
  text(Math.floor(expected), width - 30, 20);
}

function keyPressed() {
  game.handleKeystrokes(keyCode);
}