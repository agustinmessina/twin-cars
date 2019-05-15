// const blockWidth = 50;
// const blockHeight = 100;
const blockSize = {
  w : 50,
  h : 100
}

// const trackWidth = blockSize.w * 6;
// const trackHeight = blockSize.h * 3; // blockSize.w * 6

const background1 = {
  rightX: blockSize.w * 6,
  leftX: 0,
  height: blockSize.w * 6,
  width: blockSize.h * 3
}
const background2 = Object.create(background1);
background2.rightX = background1.rightX * 2;
background2.leftX = background1.rightX;

const gameSettings = {
  speed: 4,
  difficulty: 5,
  duration: 30,
  initialTime: Date.now()
}
// const difficulty = 5;
// const speed = 4;
// const gameDurationInSeconds = 30;
// const initialTime = Date.now();

let blocks1 = [];
let blocks2 = [];
let cardo;

let points = 0;
let expected = 0;
let timeEnded = false;

function setup() {
  createCanvas(trackWidth * 2, trackHeight);

  blocks1.push(new Block(trackWidth / 2, blockSize, background1, gameSettings));
  blocks2.push(new Block(trackWidth * 1.5, blockSize, background2, gameSettings));
  cardo = new Car('A', 'D', blockSize.w / 2, blockSize.w / 8);
}

function draw() {
  background(0);

  if ((Date.now() - gameSettings.initialTime) >= (gameSettings.duration * 1000)) timeEnded = true;

  if (!timeEnded) {
    playGame(blocks1, background1);
    playGame(blocks2, background2);
  } else {
    pauseGame();
  }

  fill(255);
  text(Math.floor(points), 10, 20);
  text(Math.floor(expected), 50, 20);

}

function playGame(blocks, background, car) {
  let lastBlock = blocks[blocks.length - 1];

  if (lastBlock.points[3].y === 0) {
    blocks.push(new Block(lastBlock.points[3].x, blockSize, background, gameSettings, lastBlock.points[3].x));
  }

  for (let i = 0; i < blocks.length; i++) {

    if (blocks[i].points[3].y === background.h) {
      blocks.splice(i, 1);
    }

    blocks[i].central = false;

    if (checkCentralBlock(blocks[i])) {
      blocks[i].central = true;

      let difference = blocks[i].points[0].y - trackHeight / 2;

      const xModifier = difference / blockSize.h * blocks[i].direction;

      const partialX1 = blocks[i].points[0].x + xModifier;
      const partialX2 = blocks[i].points[1].x + xModifier;

      car.updateColor(partialX1, partialX2);
      points += car.calculatePoints(partialX1, partialX2);
      expected += 1;
    }

    blocks[i].show();
    blocks[i].update();
  }

  car.show();
}

function pauseGame() {
  for (let block of blocks) {
    block.show();
  }

  car.static = true;
  car.show();
}

function keyPressed() {
  if (keyCode === car.leftKey.charCodeAt(0) || keyCode === car.rightKey.charCodeAt(0)) {
    car.move(String.fromCharCode(keyCode));
  }
}

function checkCentralBlock(block) {
  const max = trackHeight / 2 + blockSize.h;
  const min = trackHeight / 2;

  if (block.points[0].y > min && block.points[0].y < max) {
    return true;
  }

  return false;
}